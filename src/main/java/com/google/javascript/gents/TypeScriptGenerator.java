package com.google.javascript.gents;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.collect.Sets;
import com.google.common.io.Files;
import com.google.javascript.jscomp.CodeConsumer;
import com.google.javascript.jscomp.CodeGenerator;
import com.google.javascript.jscomp.CodePrinter;
import com.google.javascript.jscomp.CodePrinter.Builder.CodeGeneratorFactory;
import com.google.javascript.jscomp.CodePrinter.Format;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.ErrorFormat;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.rhino.Node;

import org.kohsuke.args4j.CmdLineException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * A tool that transpiles {@code .js} ES6 and ES5 Closure annotated JavaScript to {@code .ts}
 * TypeScript.
 */
public class TypeScriptGenerator {

  public static void main(String[] args) {
    Options options = null;
    try {
      options = new Options(args);
    } catch (CmdLineException e) {
      System.err.println(e.getMessage());
      System.err.println("Usage: gents [options...] arguments...");
      e.getParser().printUsage(System.err);
      System.err.println();
      System.exit(1);
    }
    try {
      TypeScriptGenerator generator = new TypeScriptGenerator(options);
      generator.generateTypeScript();
      if (generator.hasErrors()) {
        // Already reported through the print stream.
        System.exit(2);
      }
    } catch (Exception e) {
      e.printStackTrace(System.err);
      System.err.println("Uncaught exception in gents, exiting.");
      System.exit(3);
    }
    System.exit(0);
  }

  private final Options opts;
  private final Compiler compiler;
  private final GentsErrorManager errorManager;

  TypeScriptGenerator(Options opts) {
    this.opts = opts;
    this.compiler = new Compiler();
    compiler.disableThreads();
    this.errorManager = new GentsErrorManager(System.err,
        ErrorFormat.MULTILINE.toFormatter(compiler, true), opts.debug);
    compiler.setErrorManager(errorManager);
  }

  boolean hasErrors() {
    return errorManager.getErrorCount() > 0;
  }

  void generateTypeScript() {
    List<SourceFile> srcFiles = getFiles(opts.srcFiles);
    List<SourceFile> externFiles = getFiles(opts.externs);
    Set<String> filesToConvert = Sets.newHashSet(opts.filesToConvert);

    Map<String, String> result = generateTypeScript(filesToConvert, srcFiles, externFiles);

    // TODO(renez): consider refactoring file output for handling directory output better
    for (String basename : result.keySet()) {
      String tsCode = result.get(basename);
      if ("-".equals(opts.output)) {
        System.out.println("========================================");
        System.out.println("File: " + basename + ".js");
        System.out.println("========================================");
        System.out.println(tsCode);
      } else {
        File output = new File(new File(opts.output), basename + ".ts");
        if (!output.getParentFile().exists() &&
            !output.getParentFile().mkdirs()) {
          throw new IllegalArgumentException("Unable to make directories " + output.getParent());
        }
        try {
          Files.write(tsCode, output, UTF_8);
        } catch (IOException e) {
          throw new IllegalArgumentException("Unable to write to file " + output.getName(), e);
        }
      }
    }
  }

  /**
   * Returns a map from the basename to the TypeScript code generated for the file.
   */
  Map<String, String> generateTypeScript(Set<String> filesToConvert,
      List<SourceFile> srcFiles, List<SourceFile> externs) throws AssertionError {
    Map<String, String> sourceFileMap = new HashMap<>();

    final CompilerOptions compilerOpts = opts.getCompilerOptions();
    // Compile javascript code
    compiler.compile(externs, srcFiles, compilerOpts);

    Node externRoot = compiler.getRoot().getFirstChild();
    Node srcRoot = compiler.getRoot().getLastChild();

    CollectModuleMetadata modulePrePass = new CollectModuleMetadata(compiler);
    modulePrePass.process(externRoot, srcRoot);

    // Strips all file nodes that we are not compiling.
    stripNonCompiledNodes(srcRoot, filesToConvert);

    CompilerPass modulePass = new ModuleConversionPass(compiler,
        modulePrePass.getFileMap(), modulePrePass.getNamespaceMap());
    modulePass.process(externRoot, srcRoot);

    CompilerPass classPass = new ClassConversionPass(compiler);
    classPass.process(externRoot, srcRoot);

    CompilerPass typingPass = new TypeAnnotationPass(compiler);
    typingPass.process(externRoot, srcRoot);

    // We only use the source root as the extern root is ignored for codegen
    for (Node file : srcRoot.children()) {
      String basename = getFileNameWithoutExtension(file.getSourceFileName());
      CodeGeneratorFactory factory = new CodeGeneratorFactory() {
        @Override
        public CodeGenerator getCodeGenerator(Format outputFormat, CodeConsumer cc) {
          return new GentsCodeGenerator(cc, compilerOpts);
        }
      };

      String tsCode = new CodePrinter.Builder(file)
          .setCompilerOptions(opts.getCompilerOptions())
          .setTypeRegistry(compiler.getTypeRegistry())
          .setCodeGeneratorFactory(factory)
          .setPrettyPrint(true)
          .setLineBreak(true)
          .setOutputTypes(true)
          .build();
      // TODO(renez): pipe generated TypeScript code through clang-format
      sourceFileMap.put(basename, tsCode);
    }

    errorManager.doGenerateReport();
    return sourceFileMap;
  }

  /**
   * Removes the root nodes for all the library files from the source node.
   */
  void stripNonCompiledNodes(Node n, Set<String> filesToCompile) {
    for (Node child : n.children()) {
      if (!filesToCompile.contains(child.getSourceFileName())) {
        child.detachFromParent();
      }
    }
  }

  /**
   * Returns a list of source files from a list of file names.
   */
  List<SourceFile> getFiles(Iterable<String> fileNames) {
    List<SourceFile> files = new ArrayList<>();
    for (String fileName : fileNames) {
      files.add(SourceFile.fromFile(fileName, UTF_8));
    }
    return files;
  }

  /**
   * Returns the file name without its file extension or path. The result does not include the
   * '{@code .}'.
   */
  static String getFileNameWithoutExtension(String filepath) {
    return removeExtension(new File(filepath).getName());
  }

  /**
   * Returns the file name without its file extension.
   */
  static String removeExtension(String filename) {
    int dotIndex = filename.lastIndexOf(".");
    return (dotIndex == -1) ? filename : filename.substring(0, dotIndex);
  }
}

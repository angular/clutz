package com.google.javascript.gents;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.collect.Sets;
import com.google.common.io.ByteSource;
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
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.kohsuke.args4j.CmdLineException;

/**
 * A tool that transpiles {@code .js} ES6 and ES5 Closure annotated JavaScript to {@code .ts}
 * TypeScript.
 */
public class TypeScriptGenerator {
  /**
   * Command line clang-format string to format stdin.
   * The filename 'a.ts' is only used to inform clang-format of the file type (TS).
   */
  private static final String[] CLANG_FORMAT = {"node_modules/.bin/clang-format",
      "-assume-filename=a.ts", "-style=Google"};

  static {
    // In some environments (Mac OS X programs started from Finder, like your IDE) PATH does
    // not contain "clang-format". This property allows explicitly configuring its location.
    String cfLocation = System.getProperty("gents.clangFormat");
    if (cfLocation != null) {
      CLANG_FORMAT[0] = cfLocation;
    }
  }

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

  final PathUtil pathUtil;
  final NameUtil nameUtil;

  TypeScriptGenerator(Options opts) {
    this.opts = opts;
    this.compiler = new Compiler();
    compiler.disableThreads();
    this.errorManager = new GentsErrorManager(System.err,
        ErrorFormat.MULTILINE.toFormatter(compiler, true), opts.debug);
    compiler.setErrorManager(errorManager);

    this.pathUtil = new PathUtil(opts.root);
    this.nameUtil = new NameUtil(compiler);
  }

  boolean hasErrors() {
    return errorManager.getErrorCount() > 0;
  }

  void generateTypeScript() {
    List<SourceFile> srcFiles = getFiles(opts.srcFiles);
    List<SourceFile> externFiles = getFiles(opts.externs);
    Set<String> filesToConvert = Sets.newLinkedHashSet(opts.filesToConvert);

    Map<String, String> result = generateTypeScript(filesToConvert, srcFiles, externFiles);

    for (String filename : filesToConvert) {
      String relativePath = pathUtil.getRelativePath(".", filename);
      String basename = pathUtil.getFileNameWithoutExtension(relativePath);
      String tsCode = result.get(basename);
      if ("-".equals(opts.output)) {
        System.out.println("========================================");
        System.out.println("File: " + relativePath);
        System.out.println("========================================");
        System.out.println(tsCode);
      } else {
        String tsFilename = pathUtil.removeExtension(relativePath) + ".ts";
        File output = new File(new File(opts.output), tsFilename);
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
    Map<String, String> sourceFileMap = new LinkedHashMap<>();

    final CompilerOptions compilerOpts = opts.getCompilerOptions();
    // Compile javascript code
    compiler.compile(externs, srcFiles, compilerOpts);

    Node externRoot = compiler.getRoot().getFirstChild();
    Node srcRoot = compiler.getRoot().getLastChild();

    CollectModuleMetadata modulePrePass = new CollectModuleMetadata(compiler, nameUtil,
        filesToConvert);
    modulePrePass.process(externRoot, srcRoot);

    // Strips all file nodes that we are not compiling.
    stripNonCompiledNodes(srcRoot, filesToConvert);

    CommentLinkingPass commentsPass = new CommentLinkingPass(compiler);
    commentsPass.process(externRoot, srcRoot);
    final NodeComments comments = commentsPass.getComments();

    ModuleConversionPass modulePass = new ModuleConversionPass(compiler, pathUtil, nameUtil,
        modulePrePass.getFileMap(), modulePrePass.getNamespaceMap(), comments);
    modulePass.process(externRoot, srcRoot);

    CompilerPass classPass = new ClassConversionPass(compiler, comments);
    classPass.process(externRoot, srcRoot);

    CompilerPass typingPass = new TypeAnnotationPass(compiler, pathUtil, nameUtil,
        modulePrePass.getSymbolMap(), modulePass.getTypeRewrite(), comments);
    typingPass.process(externRoot, srcRoot);

    CompilerPass stylePass = new StyleFixPass(compiler, comments);
    stylePass.process(externRoot, srcRoot);

    // We only use the source root as the extern root is ignored for codegen
    for (Node file : srcRoot.children()) {
      String basename = pathUtil.getFileNameWithoutExtension(file.getSourceFileName());
      CodeGeneratorFactory factory = new CodeGeneratorFactory() {
        @Override
        public CodeGenerator getCodeGenerator(Format outputFormat, CodeConsumer cc) {
          return new GentsCodeGenerator(cc, compilerOpts, comments);
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

      sourceFileMap.put(basename, tryClangFormat(tsCode));
    }

    errorManager.doGenerateReport();
    return sourceFileMap;
  }

  /**
   * Attempts to format the generated TypeScript using clang-format.
   * On failure to format (ie. clang-format does not exist), return the inputted string.
   */
  String tryClangFormat(String code) {
    Process process = null;
    try {
      process = Runtime.getRuntime().exec(CLANG_FORMAT);
      final OutputStream stdin = process.getOutputStream();
      // stdout must be final for the nested object byteSource to return it.
      final InputStream stdout = process.getInputStream();

      // Write TypeScript code to stdin of the process
      BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
      writer.write(code);
      writer.flush();
      writer.close();

      // Reads stdout of the process
      ByteSource byteSource = new ByteSource() {
        @Override
        public InputStream openStream() throws IOException {
          return stdout;
        }
      };
      return byteSource.asCharSource(UTF_8).read();
    } catch (IOException e) {
      System.err.println("clang-format has failed to execute: " + e.getMessage());
      return code;
    } finally {
      if (process != null) {
        // TODO(renez): Use .waitFor(n, TimeUnit.SECONDS) and .destroyForcibly() once we moved to
        // Java 8.
        process.destroy();
      }
    }
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
}

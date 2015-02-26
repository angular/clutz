package com.google.javascript.jscomp;

import static com.google.common.collect.Lists.transform;
import static com.google.javascript.jscomp.CustomPassExecutionTime.BEFORE_CHECKS;
import static java.util.Arrays.asList;

import com.google.common.base.Function;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.google.javascript.jscomp.CodePrinter.Builder.CodeGeneratorFactory;
import com.google.javascript.jscomp.CodePrinter.Format;
import com.google.javascript.rhino.Node;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Runs the Closure Compiler over the provided closure-style sources,
 * and generates the .d.ts interface required by TypeScript.
 *
 * We use the Closure Compiler API and swap out the CodeGenerator with a custom
 * subclass to emit the code, since we produce invalid javascript (eg. "interface" keyword)
 */
public class ClosureToDts {

  private static final Function<String, SourceFile> TO_SOURCE_FILE =
      new Function<String, SourceFile>() {
        @Override public SourceFile apply(String input) {
          return SourceFile.fromFile(input, StandardCharsets.UTF_8);
        }
      };
  private final Compiler compiler;

  public ClosureToDts(Compiler compiler) {
    this.compiler = compiler;
  }

  public String translate(SourceFile source) throws Exception {
    return translate(Collections.singletonList(source));
  }

  public String translate(List<SourceFile> closureSource) throws Exception {
    final CompilerOptions options = buildOptions();
    Result result = compiler.compile(Collections.<SourceFile>emptyList(), closureSource, options);
    if (!result.success) {
      throw new RuntimeException("Compile failed: " + Arrays.toString(result.errors));
    }
    Node scriptNode = Iterables.getOnlyElement(compiler.getJsRoot().children());
    final CodePrinter.Builder builder = new CodePrinter.Builder(scriptNode);
    builder.setCompilerOptions(options);
    builder.setCodeGeneratorFactory(new CodeGeneratorFactory() {
      @Override
      public CodeGenerator getCodeGenerator(Format outputFormat, CodeConsumer mcp) {
        return new DTSCodeGenerator(mcp, options);
      }
    });
    return builder.build();
  }

  CompilerOptions buildOptions() {
    final CompilerOptions options = new CompilerOptions();
    options.setRenamingPolicy(
        VariableRenamingPolicy.OFF, PropertyRenamingPolicy.OFF);
    options.addCustomPass(BEFORE_CHECKS, new ConvertToTypedES6(compiler));
    options.addCustomPass(BEFORE_CHECKS, new ConvertToES6Classes(compiler));
    options.addCustomPass(BEFORE_CHECKS, new MoveMembersOutOfConstructor(compiler));
    options.addCustomPass(BEFORE_CHECKS, new RemoveFunctionBodies(compiler));
    options.setTranspileOnly(true);
    options.setPrettyPrint(true);
    return options;
  }

  public static void main(String[] args) throws Exception {
    List<String> inputFiles = asList(args).subList(1, args.length);
    String dtsContent = new ClosureToDts(new Compiler(System.out))
        .translate(transform(inputFiles, TO_SOURCE_FILE));
    Files.write(dtsContent, new File(args[0]), StandardCharsets.UTF_8);
  }
}

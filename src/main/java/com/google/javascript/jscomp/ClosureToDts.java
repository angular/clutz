package com.google.javascript.jscomp;

import static com.google.javascript.jscomp.CustomPassExecutionTime.BEFORE_CHECKS;

import com.google.common.collect.Iterables;
import com.google.javascript.jscomp.CodePrinter.Builder.CodeGeneratorFactory;
import com.google.javascript.jscomp.CodePrinter.Format;
import com.google.javascript.rhino.Node;

import java.io.IOException;
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

  private final Compiler compiler;

  public ClosureToDts(Compiler compiler) {
    this.compiler = compiler;
  }

  public String translate(SourceFile source) throws IOException {
    return translate(Collections.singletonList(source));
  }

  public String translate(List<SourceFile> closureSource) throws IOException {
    final CompilerOptions options = new CompilerOptions();
    options.setRenamingPolicy(
        VariableRenamingPolicy.OFF, PropertyRenamingPolicy.OFF);
    options.addCustomPass(BEFORE_CHECKS, new ConvertToTypedES6(compiler));
    options.addCustomPass(BEFORE_CHECKS, new ConvertToES6Classes(compiler));
    options.addCustomPass(BEFORE_CHECKS, new MoveMembersOutOfConstructor(compiler));
    options.setTranspileOnly(true);
    options.setPrettyPrint(true);
    Result result = compiler.compile(Collections.<SourceFile>emptyList(), closureSource, options);
    if (!result.success) {
      throw new RuntimeException("Compile failed: " + Arrays.toString(result.errors));
    }
    Node scriptNode = Iterables.getOnlyElement(compiler.getJsRoot().children());
    final CodePrinter.Builder builder = new CodePrinter.Builder(scriptNode);
    builder.setCompilerOptions(options);
//    builder.setCodeGeneratorFactory(new CodeGeneratorFactory() {
//      @Override
//      public CodeGenerator getCodeGenerator(Format outputFormat, CodeConsumer mcp) {
//        return new DTSCodeGenerator(mcp, options);
//      }
//    });
    return builder.build();
  }
}

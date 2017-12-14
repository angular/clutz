package com.google.javascript.clutz;

import static com.google.common.base.Preconditions.checkState;

import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerInput;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.rhino.Node;
import java.util.ArrayList;
import java.util.List;

/**
 * InitialParseRetainingCompiler clones a copy of the AST of the inputs before any of the compiler
 * passes are run. The original AST is required by ImportRenameMapBuilder.
 */
public class InitialParseRetainingCompiler extends Compiler {
  private List<Node> parsedInputs = new ArrayList<>();

  /**
   * Copied verbatim from com.google.javascript.jscomp.Compiler, except using getter methods instead
   * of private fields and running cloneParsedInputs() at the appropriate time.
   */
  @Override
  public <T1 extends SourceFile, T2 extends SourceFile> Result compile(
      List<T1> externs, List<T2> inputs, CompilerOptions options) {
    // The compile method should only be called once.
    checkState(getRoot() == null);

    try {
      init(externs, inputs, options);
      if (!hasErrors()) {
        parseForCompilation();
        cloneParsedInputs();
      }
      if (!hasErrors()) {
        if (options.getInstrumentForCoverageOnly()) {
          // TODO(bradfordcsmith): The option to instrument for coverage only should belong to the
          //     runner, not the compiler.
          instrumentForCoverage();
        } else {
          stage1Passes();
          if (!hasErrors()) {
            stage2Passes();
          }
        }
        performPostCompilationTasks();
      }
    } finally {
      generateReport();
    }
    return getResult();
  }

  /** Loop over all the inputs and clone their ASTs into this.parsedInputs. */
  private void cloneParsedInputs() {
    for (CompilerInput ci : getInputsById().values()) {
      Node n = ci.getAstRoot(this);
      parsedInputs.add(n.cloneTree());
    }
  }

  public List<Node> getParsedInputs() {
    return parsedInputs;
  }
}

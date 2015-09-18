package com.google.javascript.cl2dts;

import static com.google.common.truth.Truth.assert_;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.singletonList;

import com.google.common.truth.FailureStrategy;
import com.google.common.truth.Subject;
import com.google.common.truth.SubjectFactory;
import com.google.javascript.cl2dts.DeclarationGenerator.Options;
import com.google.javascript.jscomp.SourceFile;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

/**
 * A subject that supports assertions on {@link DeclarationGenerator}'s results.
 */
class ProgramSubject extends Subject<ProgramSubject, ProgramSubject.Program> {

  public static ProgramSubject assertThatProgram(File singleInput) {
    return assertThatProgram(singletonList(singleInput), Collections.<File>emptyList());
  }

  public static ProgramSubject assertThatProgram(List<File> roots, List<File> nonroots) {
    Program program = new Program(roots, nonroots);
    return assert_().about(ProgramSubject.FACTORY).that(program);
  }

  static final SubjectFactory<ProgramSubject, ProgramSubject.Program> FACTORY =
      new SubjectFactory<ProgramSubject, ProgramSubject.Program>() {
        @Override
        public ProgramSubject getSubject(FailureStrategy fs, ProgramSubject.Program that) {
          return new ProgramSubject(fs, that);
        }
      };
  static final List<SourceFile> NO_EXTERNS = Collections.emptyList();

  public ProgramSubject(FailureStrategy failureStrategy, ProgramSubject.Program subject) {
    super(failureStrategy, subject);
  }

  public void generatesDeclarations(Boolean withExterns, String expected) {
    Options opts = new Options(!withExterns);

    List<SourceFile> sourceFiles = new ArrayList<>();
    for (File nonroot : getSubject().nonroots) {
      sourceFiles.add(SourceFile.fromFile(nonroot, UTF_8));
    }

    StringBuilder depgraph = new StringBuilder("[['roots',[[");
    Iterator<File> it = getSubject().roots.iterator();
    while (it.hasNext()) {
      File root = it.next();
      sourceFiles.add(SourceFile.fromFile(root, UTF_8));
      depgraph.append("'").append(root.getPath()).append("'");
      if (it.hasNext())
        depgraph.append(",");
    }
    depgraph.append("]]]]");
    opts.depgraphs = singletonList(depgraph.toString());

    String actual = new DeclarationGenerator(opts).generateDeclarations(sourceFiles, NO_EXTERNS);
    if (!actual.equals(expected)) {
      failureStrategy.failComparing("compilation result doesn't match", expected, actual);
    }
  }

  static class Program {
    private final List<File> roots;
    private final List<File> nonroots;

    Program(List<File> roots, List<File> nonroots) {
      this.roots = roots;
      this.nonroots = nonroots;
    }
  }
}

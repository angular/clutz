package com.google.javascript.cl2dts;

import static com.google.common.truth.Truth.assert_;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.singletonList;

import com.google.common.truth.FailureStrategy;
import com.google.common.truth.Subject;
import com.google.common.truth.SubjectFactory;
import com.google.javascript.jscomp.SourceFile;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
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

    List<String> roots = new ArrayList<>();
    for (File root : getSubject().roots) {
      sourceFiles.add(SourceFile.fromFile(root, UTF_8));
      roots.add(root.getPath());
    }

    String actual = new DeclarationGenerator(opts)
        .generateDeclarations(sourceFiles, NO_EXTERNS, new Depgraph(roots));
    actual = DeclarationGenerator.GOLDEN_FILE_COMMENTS_REGEXP.matcher(actual).replaceAll("");
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

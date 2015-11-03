package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assert_;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.singletonList;

import com.google.common.base.Joiner;
import com.google.common.truth.FailureStrategy;
import com.google.common.truth.Subject;
import com.google.common.truth.SubjectFactory;
import com.google.javascript.jscomp.SourceFile;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nullable;

/**
 * A subject that supports assertions on {@link DeclarationGenerator}'s results.
 */
class ProgramSubject extends Subject<ProgramSubject, ProgramSubject.Program> {

  /** A stripped down version of Closure's base.js for Clutz tests. */
  private static final SourceFile CLUTZ_GOOG_BASE =
      SourceFile.fromFile("src/test/java/com/google/javascript/clutz/base.js", UTF_8);

  public static ProgramSubject assertThatProgram(String sourceText) {
    return assert_().about(ProgramSubject.FACTORY).that(new Program(sourceText));
  }

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
  static final List<SourceFile> THIRD_PARTY_EXTERNS =
          singletonList(SourceFile.fromFile("src/resources/third_party_externs.js"));

  private boolean withExterns = false;

  public ProgramSubject(FailureStrategy failureStrategy, ProgramSubject.Program subject) {
    super(failureStrategy, subject);
  }

  public ProgramSubject withExterns() {
    ProgramSubject result = assert_().about(ProgramSubject.FACTORY).that(getSubject());
    result.withExterns = true;
    return result;
  }

  public void generatesDeclarations(String expected) {
    String actual = parse();
    String stripped =
        DeclarationGeneratorTests.GOLDEN_FILE_COMMENTS_REGEXP.matcher(actual).replaceAll("");
    if (!stripped.equals(expected)) {
      failureStrategy.failComparing("compilation result doesn't match", expected, stripped);
    }
  }

  public void reportsDiagnosticsContaining(String message) {
    String unexpectedRes = null;
    try {
      unexpectedRes = parse();
      failureStrategy.failComparing("expected errors, but got a successful result",
          message, unexpectedRes);
    } catch (DeclarationGeneratorException e) {
      assertThat(Joiner.on('\n').join(e.errors)).contains(message);
    }
  }

  private String parse() throws AssertionError {
    Options opts = new Options(!withExterns);

    List<SourceFile> sourceFiles = new ArrayList<>();

    // base.js is needed for the type declaration of goog.require for
    // all tests, except the base.js one itself.
    if (getSubject().roots.isEmpty() || !getSubject().roots.get(0).getName().equals("base.js")) {
      sourceFiles.add(CLUTZ_GOOG_BASE);
    }

    for (File nonroot : getSubject().nonroots) {
      sourceFiles.add(SourceFile.fromFile(nonroot, UTF_8));
    }

    List<String> roots = new ArrayList<>();

    for (File root : getSubject().roots) {
      sourceFiles.add(SourceFile.fromFile(root, UTF_8));
      roots.add(root.getPath());
    }

    if (getSubject().sourceText != null) {
      sourceFiles.add(SourceFile.fromCode("main.js", getSubject().sourceText));
      roots.add("main.js");
    }

    List<SourceFile> externs = NO_EXTERNS;
    if (withExterns) {
      externs = DeclarationGenerator.getDefaultExterns(opts);
      externs.addAll(THIRD_PARTY_EXTERNS);
    }

    String actual = new DeclarationGenerator(opts)
        .generateDeclarations(sourceFiles, externs, new Depgraph(roots));
    return actual;
  }

  static class Program {
    private final List<File> roots;
    private final List<File> nonroots;
    @Nullable
    private final String sourceText;

    Program(String sourceText) {
      this.roots = Collections.emptyList();
      this.nonroots = Collections.emptyList();
      this.sourceText = sourceText;
    }

    Program(List<File> roots, List<File> nonroots) {
      this.roots = roots;
      this.nonroots = nonroots;
      this.sourceText = null;
    }
  }
}

package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assert_;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.singletonList;

import com.google.common.base.Joiner;
import com.google.common.truth.FailureStrategy;
import com.google.common.truth.StringSubject;
import com.google.common.truth.Subject;
import com.google.common.truth.SubjectFactory;
import com.google.javascript.jscomp.SourceFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nullable;

/**
 * A subject that supports assertions on {@link DeclarationGenerator}'s results.
 */
class ProgramSubject extends Subject<ProgramSubject, ProgramSubject.Program> {

  enum Externs {
    NONE,
    PLATFORM,
    THIRD_PARTY_AND_PLATFORM,;

    static Externs fromTestName(String name) {
      if (name.contains("_3p_externs")) return Externs.THIRD_PARTY_AND_PLATFORM;
      if (name.contains("_externs")) return PLATFORM;
      return NONE;
    }
  }

  /** A stripped down version of Closure's base.js for Clutz tests. */
  private static final SourceFile CLUTZ_GOOG_BASE =
      SourceFile.fromFile("src/test/java/com/google/javascript/clutz/base.js", UTF_8);

  static ProgramSubject assertThatProgram(String... sourceLines) {
    String sourceText = Joiner.on('\n').join(sourceLines);
    return assert_().about(ProgramSubject.FACTORY).that(new Program(sourceText));
  }

  static ProgramSubject assertThatProgram(File singleInput) {
    return assertThatProgram(singletonList(singleInput), Collections.<File>emptyList());
  }

  static ProgramSubject assertThatProgram(List<File> roots, List<File> nonroots) {
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

  private Externs externs = Externs.NONE;

  ProgramSubject(FailureStrategy failureStrategy, ProgramSubject.Program subject) {
    super(failureStrategy, subject);
  }

  ProgramSubject withExterns(Externs newExterns) {
    ProgramSubject result = assert_().about(ProgramSubject.FACTORY).that(getSubject());
    result.externs = newExterns;
    return result;
  }

  void generatesDeclarations(String expected) {
    String[] parseResult = parse();
    assertThat(parseResult[1]).is("");
    String actual = parseResult[0];
    String stripped =
        DeclarationGeneratorTests.GOLDEN_FILE_COMMENTS_REGEXP.matcher(actual).replaceAll("");
    if (!stripped.equals(expected)) {
      failureStrategy.failComparing("compilation result doesn't match", expected, stripped);
    }
  }

  StringSubject diagnosticStream() {
    String[] parseResult = parse();
    return assertThat(parseResult[1]);
  }

  private String[] parse() throws AssertionError {
    Options opts = new Options(externs == Externs.NONE);
    opts.debug = true;
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

    List<SourceFile> externFiles;
    switch (externs) {
      case NONE:
        externFiles = NO_EXTERNS;
        break;
      case PLATFORM:
        externFiles = DeclarationGenerator.getDefaultExterns(opts);
        break;
      case THIRD_PARTY_AND_PLATFORM:
        externFiles = DeclarationGenerator.getDefaultExterns(opts);
        externFiles.addAll(THIRD_PARTY_EXTERNS);
        break;
      default:
        throw new AssertionError();
    }


    PrintStream err = System.err;
    try {
      // Admittedly the PrintStream setting is a bit hacky, but it's closest to how users would
      // run Clutz.
      ByteArrayOutputStream out = new ByteArrayOutputStream();
      System.setErr(new PrintStream(out));
      DeclarationGenerator generator = new DeclarationGenerator(opts);
      String dts = generator.generateDeclarations(sourceFiles, externFiles, new Depgraph(roots));
      String diagnostics = out.toString();
      return new String[] {dts, diagnostics};
    } finally {
      System.setErr(err);
    }
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

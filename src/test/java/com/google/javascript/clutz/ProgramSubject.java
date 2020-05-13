package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assert_;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.singletonList;

import com.google.common.base.Joiner;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.google.common.truth.FailureMetadata;
import com.google.common.truth.StringSubject;
import com.google.common.truth.Subject;
import com.google.javascript.jscomp.SourceFile;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Nullable;

/** A subject that supports assertions on {@link DeclarationGenerator}'s results. */
class ProgramSubject extends Subject {

  /**
   * A global root for all file access for testing in clutz. Intentionally left empty here, so that
   * some forks (like google's internal environment) can overwrite it with a non-empty value.
   */
  static final String SOURCE_ROOT = "";

  static String resource(String path) {
    return SOURCE_ROOT + path;
  }

  /**
   * A stripped down version of Closure's base.js for incremental Clutz tests. In
   * production we also use this file for every incremental run, because the original base.js is not
   * passed in.
   */
  private static final SourceFile CLUTZ_GOOG_BASE =
      SourceFile.fromFile(resource("src/resources/partial_goog_base.js"), UTF_8);

  private final ProgramSubject.Program actual;
  public boolean withPlatform = false;
  public String extraExternFile = null;
  public boolean emitBase = false;
  public String depgraph = null;
  public boolean debug = true;

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

  static final Subject.Factory<ProgramSubject, ProgramSubject.Program> FACTORY =
      new Subject.Factory<ProgramSubject, ProgramSubject.Program>() {
        @Override
        public ProgramSubject createSubject(
            FailureMetadata failureMetadata, ProgramSubject.Program that) {
          return new ProgramSubject(failureMetadata, that);
        }
      };

  ProgramSubject(FailureMetadata failureMetadata, ProgramSubject.Program subject) {
    super(failureMetadata, subject);
    this.actual = subject;
  }

  void generatesDeclarations(File golden) throws IOException {
    String[] parseResult = parse();
    assertThat(parseResult[1]).isEqualTo("");
    String actual = parseResult[0];
    String stripped =
        DeclarationGeneratorTest.GOLDEN_FILE_COMMENTS_REGEXP.matcher(actual).replaceAll("");
    String expected = DeclarationGeneratorTest.getTestFileText(golden);
    String expectedClean =
        DeclarationGeneratorTest.GOLDEN_FILE_COMMENTS_REGEXP.matcher(expected).replaceAll("");
    if (!stripped.equals(expectedClean)) {
      // If the `UPDATE_GOLDENS` flag is set, overwrite the golden files, unless it's a `_with_platform.d.ts`
      // which have 2 golden files that are concatenated, or if the golden has comments, both of which
      // shouldn't be blindly overwritten
      if (System.getenv("UPDATE_GOLDENS") != null
          && !golden.getName().endsWith("_with_platform.d.ts")
          && expected.equals(expectedClean)) {
        Files.asCharSink(golden, StandardCharsets.UTF_8).write(stripped);
      } else {
        check("generatedDeclarations()")
            .withMessage("Verifying %s", golden.getName())
            .that(stripped)
            .isEqualTo(expected);
      }
    }
  }

  StringSubject diagnosticStream() {
    String[] parseResult = parse();
    return assertThat(parseResult[1]);
  }

  private String[] parse() throws AssertionError {
    Options opts = new Options();
    opts.debug = debug;
    opts.partialInput = true;
    opts.collidingProvides = ImmutableSet.of("colliding_provide.aliased");
    opts.browserResolverStrippedPrefixes = Arrays.asList("abs_strip_for_testing");

    List<SourceFile> sourceFiles = new ArrayList<>();

    // base.js is needed for the type declaration of goog.require for
    // all total tests, except the base.js one itself.
    if (actual.roots.isEmpty()) {
      sourceFiles.add(CLUTZ_GOOG_BASE);
    } else {
      File firstFile = actual.roots.get(0);
      if (!firstFile.getName().equals("base.js")) {
        sourceFiles.add(CLUTZ_GOOG_BASE);
      }
    }

    Set<String> nonroots = new LinkedHashSet<>();
    for (File nonroot : actual.nonroots) {
      sourceFiles.add(SourceFile.fromPath(nonroot.toPath(), UTF_8));
      nonroots.add(nonroot.getPath().replace(System.getProperty("file.separator"), "/"));
    }

    Set<String> roots = new LinkedHashSet<>();

    for (File root : actual.roots) {
      sourceFiles.add(SourceFile.fromPath(root.toPath(), UTF_8));
      roots.add(root.getPath().replace(System.getProperty("file.separator"), "/"));
    }

    if (actual.sourceText != null) {
      sourceFiles.add(SourceFile.fromCode("main.js", actual.sourceText));
      roots.add("main.js");
    }

    if (emitBase) {
      roots.add(CLUTZ_GOOG_BASE.getName());
    }

    List<SourceFile> externFiles;
    if (withPlatform) {
      externFiles = DeclarationGenerator.getDefaultExterns(opts);
    } else {
      // Clutz is very permissive in its inputs, thus supporting ES6 code. Closure refuses
      // to compile ES6 unless es6.js extern is passed in. To speed up test exectution we
      // pass a thin shim instead of the real es6.js extern.
      externFiles =
          Lists.newArrayList(SourceFile.fromFile(resource("src/resources/es6_min.js"), UTF_8));
    }

    if (depgraph != null) {
      opts.depgraph = DepgraphTest.parseFile(depgraph);
    } else {
      opts.depgraph = Depgraph.forRoots(roots, nonroots);
    }

    if (extraExternFile != null) {
      externFiles.add(SourceFile.fromFile(extraExternFile, UTF_8));
    }

    PrintStream err = System.err;
    try {
      // Admittedly the PrintStream setting is a bit hacky, but it's closest to how users would
      // run Clutz.
      ByteArrayOutputStream out = new ByteArrayOutputStream();
      System.setErr(new PrintStream(out));
      DeclarationGenerator generator = new DeclarationGenerator(opts);
      String dts =
          generator.generateDeclarations(
              sourceFiles, externFiles, Depgraph.forRoots(roots, nonroots));
      String diagnostics = out.toString();
      return new String[] {dts, diagnostics};
    } finally {
      System.setErr(err);
    }
  }

  static class Program {
    private final List<File> roots;
    private final List<File> nonroots;
    @Nullable private final String sourceText;

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

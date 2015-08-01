package com.google.javascript.jscomp;

import static com.google.common.truth.Truth.assert_;

import com.google.common.base.Joiner;
import com.google.common.truth.FailureStrategy;
import com.google.common.truth.Subject;
import com.google.common.truth.SubjectFactory;

/**
 * A subject that supports assertions on {@link DeclarationGenerator}'s results.
 */
class ProgramSubject extends Subject<ProgramSubject, ProgramSubject.Program> {

  private static final Joiner LINE_JOINER = Joiner.on('\n');

  public static ProgramSubject assertThatProgram(String... lines) {
    Program program = new Program(LINE_JOINER.join(lines));
    return assert_().about(ProgramSubject.FACTORY).that(program);
  }

  static final SubjectFactory<ProgramSubject, ProgramSubject.Program> FACTORY =
      new SubjectFactory<ProgramSubject, ProgramSubject.Program>() {
        @Override
        public ProgramSubject getSubject(FailureStrategy fs, ProgramSubject.Program that) {
          return new ProgramSubject(fs, that);
        }
      };

  public ProgramSubject(FailureStrategy failureStrategy, ProgramSubject.Program subject) {
    super(failureStrategy, subject);
  }

  public void generatesDeclarations(String... lines) {
    DeclarationGenerator dct = new DeclarationGenerator(false);
    String actual = dct.generateDeclarations(getSubject().code);
    String expected = LINE_JOINER.join(lines);
    if (!actual.equals(expected)) {
      failureStrategy.failComparing("compilation result doesn't match", expected, actual);
    }
  }

  static class Program {
    private final String code;

    Program(String code) {
      this.code = code;
    }
  }
}

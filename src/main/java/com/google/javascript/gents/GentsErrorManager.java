package com.google.javascript.gents;

import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.MessageFormatter;
import com.google.javascript.jscomp.PrintStreamErrorManager;
import java.io.PrintStream;

/**
 * An error manager that delays reporting through {@link #doGenerateReport()} and allows failing
 * fast.
 *
 * <p>This error manager is a simplified version of the {@code ClutzErrorManager} from Clutz.
 */
public final class GentsErrorManager extends PrintStreamErrorManager {

  private final boolean debug;

  public static final DiagnosticType GENTS_MODULE_PASS_ERROR =
      DiagnosticType.error("GENTS_MODULE_PASS_ERROR", "{0}");
  public static final DiagnosticType GENTS_CLASS_PASS_ERROR =
      DiagnosticType.error("GENTS_CLASS_PASS_ERROR", "{0}");

  public GentsErrorManager(PrintStream stream, MessageFormatter formatter, boolean debug) {
    super(formatter, stream);
    this.debug = debug;
  }

  @Override
  public void report(CheckLevel level, JSError error) {
    // Ignore warnings in non-debug mode.
    if (!debug && level == CheckLevel.WARNING) {
      return;
    }
    super.report(level, error);
  }

  @Override
  public void generateReport() {
    // Don't do anything
  }

  public void doGenerateReport() {
    super.generateReport();
  }
}

package com.google.javascript.gents;

import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DiagnosticGroups;

import org.kohsuke.args4j.Argument;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.Option;
import org.kohsuke.args4j.spi.StringArrayOptionHandler;

import java.util.ArrayList;
import java.util.List;

/**
 * A class that parses the command line arguments and generates {@code CompilerOptions} to use with
 * Closure Compiler.
 */
public class Options {

  @Option(name = "-o", usage = "output to this directory", metaVar = "OUTPUT")
  String output = "-";

  @Option(name = "--debug", usage = "run in debug mode (prints compiler warnings)")
  boolean debug = false;

  @Option(name = "--externs",
      usage = "list of files to read externs definitions (as separate args)",
      metaVar = "EXTERN...",
      handler = StringArrayOptionHandler.class)
  List<String> externs = new ArrayList<>();

  @Argument
  List<String> arguments = new ArrayList<>();

  public CompilerOptions getCompilerOptions() {
    final CompilerOptions options = new CompilerOptions();
    options.setClosurePass(true);

    options.setCheckGlobalNamesLevel(CheckLevel.ERROR);
    // Report duplicate definitions, e.g. for accidentally duplicated externs.
    options.setWarningLevel(DiagnosticGroups.DUPLICATE_VARS, CheckLevel.ERROR);

    options.setLanguage(CompilerOptions.LanguageMode.ECMASCRIPT6);
    options.setLanguageOut(CompilerOptions.LanguageMode.NO_TRANSPILE);

    // Do not transpile module declarations
    options.setWrapGoogModulesForWhitespaceOnly(false);

    // Compiler passes must be disabled to disable down-transpilation to ES5.
    options.skipAllCompilerPasses();
    // So that we can query types after compilation.
    options.setIdeMode(true);

    return options;
  }

  Options(String[] args) throws CmdLineException {
    CmdLineParser parser = new CmdLineParser(this);
    parser.parseArgument(args);
    if (arguments.isEmpty()) {
      throw new CmdLineException(parser, "No files were given");
    }
  }

  Options() {
  }
}

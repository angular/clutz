package com.google.javascript.clutz;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.io.Files;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DiagnosticGroups;

import org.kohsuke.args4j.Argument;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.Option;
import org.kohsuke.args4j.spi.StringArrayOptionHandler;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Options {

  @Option(name = "-o", usage = "output to this file", metaVar = "OUTPUT")
  String output = "-";

  @Option(name = "--debug", usage = "run in debug mode (prints compiler warnings)")
  boolean debug = false;

  @Option(name = "--externs",
      usage = "list of files to read externs definitions (as separate args)",
      metaVar = "EXTERN...",
      handler = StringArrayOptionHandler.class)
  List<String> externs = new ArrayList<>();

  @Option(name = "--depgraphs",
      usage = "file(s) which contains the JSON representation of the dependency graph",
      metaVar = "file.depgraph...",
      handler = StringArrayOptionHandler.class)
  List<String> depgraphFiles = new ArrayList<>();

  @Option(name = "--emitPlatformExterns",
      usage = "emits platform externs, instead of omitting them in favor of TS lib.d.ts")
  boolean emitPlatformExterns;

  @Argument
  List<String> arguments = new ArrayList<>();

  public CompilerOptions getCompilerOptions() {
    final CompilerOptions options = new CompilerOptions();
    options.setClosurePass(true);

    // All diagnostics are WARNINGs (or off) and thus ignored unless debug == true.
    // Only report issues (and fail for them) that are specifically causing problems for Clutz.
    // The idea is to not do a general sanity check of Closure code, just make sure Clutz works.
    // Report missing types as errors.
    options.setCheckGlobalNamesLevel(CheckLevel.ERROR);
    // Report duplicate definitions, e.g. for accidentally duplicated externs.
    options.setWarningLevel(DiagnosticGroups.DUPLICATE_VARS, CheckLevel.ERROR);

    // Late Provides are errors by default, but they do not prevent clutz from transpiling.
    options.setWarningLevel(DiagnosticGroups.LATE_PROVIDE, CheckLevel.OFF);

    options.setLanguage(CompilerOptions.LanguageMode.ECMASCRIPT6);
    options.setLanguageOut(CompilerOptions.LanguageMode.ECMASCRIPT5);
    options.setCheckTypes(true);
    options.setInferTypes(true);
    options.setIdeMode(true); // So that we can query types after compilation.
    return options;
  }

  Options(String[] args) throws CmdLineException {
    CmdLineParser parser = new CmdLineParser(this);
    parser.parseArgument(args);
    if (arguments.isEmpty()) {
      throw new CmdLineException(parser, "No files were given");
    }
  }

  Options() {}

  public List<String> readDepgraphs() {
    List<String> result = new ArrayList<>();
    for (String file : depgraphFiles) {
      try {
        result.add(Files.toString(new File(file), UTF_8));
      } catch (FileNotFoundException e) {
        throw new IllegalArgumentException("depgraph file not found: " + file, e);
      } catch (IOException e) {
        throw new RuntimeException("error reading depgraph file " + file, e);
      }
    }
    return result;
  }
}

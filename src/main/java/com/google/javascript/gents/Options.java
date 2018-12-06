package com.google.javascript.gents;

import static com.google.common.base.Charsets.UTF_8;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DiagnosticGroups;
import com.google.javascript.jscomp.parsing.Config;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.kohsuke.args4j.Argument;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.Option;
import org.kohsuke.args4j.spi.StringArrayOptionHandler;

/**
 * A class that parses the command line arguments and generates {@code CompilerOptions} to use with
 * Closure Compiler.
 */
public class Options {

  @Option(name = "-o", usage = "output to this directory", metaVar = "OUTPUT")
  String output = "-";

  @Option(name = "--root", usage = "root directory of imports", metaVar = "ROOT")
  String root = ".";

  @Option(name = "--debug", usage = "run in debug mode (prints compiler warnings)")
  boolean debug = false;

  @Option(
    name = "--log",
    usage = "output a log of module rewriting to this location",
    metaVar = "MODULE_REWRITE_LOG"
  )
  String moduleRewriteLog = null;

  @Option(
    name = "--dependenciesManifest",
    usage =
        "the path to a manifest file containing all dependencies\n"
            + "Passing dependency files is disallowed when \"--dependenciesManifest\" option is used",
    metaVar = "DEPENDENCIES_MANIFEST"
  )
  String dependenciesManifest = null;

  @Option(
    name = "--sourcesManifest",
    usage =
        "the path to a manifest file containing all files that need to be converted to TypeScript\n"
            + "\"--convert\" option is disallowed when \"--sourcesManifest\" option is used",
    metaVar = "SOURCES_MANIFEST"
  )
  String sourcesManifest = null;

  @Option(
    name = "--convert",
    usage =
        "list of all files to be converted to TypeScript\n"
            + "This list of files does not have to be mutually exclusive from the source files",
    metaVar = "CONV...",
    handler = StringArrayOptionHandler.class
  )
  List<String> filesToConvert = new ArrayList<>();

  @Option(
    name = "--externs",
    usage = "list of files to read externs definitions (as separate args)",
    metaVar = "EXTERN...",
    handler = StringArrayOptionHandler.class
  )
  List<String> externs = new ArrayList<>();

  @Option(
    name = "--externsMap",
    usage = "File mapping externs to their TypeScript typings equivalent. Formatted as json",
    metaVar = "EXTERNSMAP"
  )
  String externsMapFile = null;

  @Option(
    name = "--alreadyConvertedPrefix",
    usage = "Goog.modules starting with this prefix are assumed to be already in TypeScript",
    metaVar = "ALREADY_CONVERTED_PREFIX"
  )
  String alreadyConvertedPrefix = "google3";

  @Option(
    name = "--absolutePathPrefix",
    usage = "Prefix for emitting absolute module references in import statements.",
    metaVar = "ABSOLUTE_PATH_PREFIX"
  )
  String absolutePathPrefix = "google3";

  @Argument List<String> arguments = new ArrayList<>();

  Set<String> srcFiles = new LinkedHashSet<>();
  Map<String, String> externsMap = null;

  public CompilerOptions getCompilerOptions() {
    final CompilerOptions options = new CompilerOptions();
    options.setClosurePass(true);

    // Turns off common warning messages, when PhaseOptimizer decides to skip some passes due to
    // unsupported code constructs. They are not very actionable to users and do not matter to
    // gents.
    Logger phaseLogger = Logger.getLogger("com.google.javascript.jscomp.PhaseOptimizer");
    phaseLogger.setLevel(Level.OFF);

    options.setCheckGlobalNamesLevel(CheckLevel.ERROR);
    // Report duplicate definitions, e.g. for accidentally duplicated externs.
    options.setWarningLevel(DiagnosticGroups.DUPLICATE_VARS, CheckLevel.ERROR);

    options.setLanguage(CompilerOptions.LanguageMode.ECMASCRIPT_NEXT);
    options.setLanguageOut(CompilerOptions.LanguageMode.NO_TRANSPILE);

    // Do not transpile module declarations
    options.setWrapGoogModulesForWhitespaceOnly(false);
    // Stop escaping the characters "=&<>"
    options.setTrustedStrings(true);
    options.setPreferSingleQuotes(true);

    // Compiler passes must be disabled to disable down-transpilation to ES5.
    options.skipAllCompilerPasses();
    // turns off optimizations.
    options.setChecksOnly(true);
    options.setPreserveDetailedSourceInfo(true);
    options.setParseJsDocDocumentation(Config.JsDocParsing.INCLUDE_DESCRIPTIONS_NO_WHITESPACE);

    options.clearConformanceConfigs();

    return options;
  }

  private Map<String, String> getExternsMap() throws IOException {
    if (this.externsMapFile != null) {
      Type mapType =
          new TypeToken<Map<String, String>>() {
            /* empty */
          }.getType();
      try (JsonReader reader =
          new JsonReader(Files.newBufferedReader(Paths.get(externsMapFile), UTF_8))) {
        return new Gson().fromJson(reader, mapType);
      }
    } else {
      return ImmutableMap.of();
    }
  }

  Options(String[] args) throws CmdLineException {
    CmdLineParser parser = new CmdLineParser(this);
    parser.parseArgument(args);

    if (filesToConvert.size() != 0 && sourcesManifest != null) {
      throw new CmdLineException(
          parser,
          "Don't specify a sources manifest file and source files (\"--convert\") at the same time.");
    }
    if (arguments.size() != 0 && dependenciesManifest != null) {
      throw new CmdLineException(
          parser,
          "Don't specify a dependencies manifest file and dependency files as arguments at the same time.");
    }

    if (sourcesManifest != null) {
      try {
        filesToConvert = Files.readAllLines(Paths.get(sourcesManifest), UTF_8);
      } catch (IOException e) {
        throw new CmdLineException(
            parser, "sources manifest file " + sourcesManifest + " not found.", e);
      }
    }

    if (dependenciesManifest == null) {
      srcFiles.addAll(arguments);
    } else {
      try {
        srcFiles.addAll(Files.readAllLines(Paths.get(dependenciesManifest), UTF_8));
      } catch (IOException e) {
        throw new CmdLineException(
            parser, "dependencies manifest file " + dependenciesManifest + " not found.", e);
      }
    }

    srcFiles.addAll(filesToConvert);

    if (srcFiles.isEmpty()) {
      throw new CmdLineException(parser, "No files were given");
    }

    try {
      externsMap = getExternsMap();
    } catch (IOException e) {
      throw new CmdLineException(parser, "externs file " + externsMapFile + " not found.", e);
    }
  }

  Options() {
    externsMap = ImmutableMap.of();
  }

  Options(String externsMapFile) throws IOException {
    this.externsMapFile = externsMapFile;
    externsMap = getExternsMap();
  }
}

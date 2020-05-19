package com.google.javascript.clutz;

import static com.google.common.collect.ImmutableList.toImmutableList;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.javascript.jscomp.*;
import com.google.javascript.jscomp.CompilerOptions.LanguageMode;
import com.google.javascript.jscomp.deps.ModuleLoader;
import com.google.javascript.jscomp.parsing.Config;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.kohsuke.args4j.Argument;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.Option;
import org.kohsuke.args4j.OptionDef;
import org.kohsuke.args4j.spi.OptionHandler;
import org.kohsuke.args4j.spi.Parameters;
import org.kohsuke.args4j.spi.Setter;
import org.kohsuke.args4j.spi.StopOptionHandler;

public class Options {
  /**
   * An {@link OptionHandler} the parses an array of strings as an option.
   *
   * <p>Whereas the builtin {@link org.kohsuke.args4j.spi.StringArrayOptionHandler} will split
   * parameters with spaces in them into their space-delimited components (e.g. {@code "foo bar"}
   * into {@code foo} and {@code bar}), this option handler does not:
   *
   * <pre>
   *  java Example --foo bar baz 'bar baz'
   *  // => Results in 'bar', 'baz', and 'bar baz'
   * </pre>
   *
   * This approach follows the conventions of shell quoting to allow option values with spaces.
   */
  public static class StringArrayOptionHandler extends OptionHandler<String> {
    public StringArrayOptionHandler(CmdLineParser parser, OptionDef option, Setter<String> setter) {
      super(parser, option, setter);
    }

    @Override
    public String getDefaultMetaVariable() {
      return "ARG ...";
    }

    @Override
    public int parseArguments(Parameters params) throws CmdLineException {
      final int paramsSize = params.size();
      for (int i = 0; i < paramsSize; i++) {
        String param = params.getParameter(i);
        if (param.startsWith("-")) {
          return i;
        }

        setter.addValue(param);
      }
      return paramsSize;
    }
  }

  @Option(name = "-o", usage = "output to this file", metaVar = "OUTPUT")
  String output = "-";

  @Option(name = "--debug", usage = "run in debug mode (prints compiler warnings)")
  boolean debug = false;

  @Option(
    name = "--closure_env",
    usage =
        "Determines the set of builtin externs to load. Options: BROWSER, CUSTOM. "
            + "Default: no builtin externs"
  )
  CompilerOptions.Environment closureEnv = null;

  @Option(
    name = "--depgraphs",
    usage = "only generate output for files listed as a root in the given depgraphs",
    metaVar = "file.depgraph...",
    handler = StringArrayOptionHandler.class
  )
  List<String> depgraphFiles = new ArrayList<>();

  @Option(
    name = "--closure_entry_points",
    usage =
        "only generate output for the given entry points to the program. Must be"
            + " goog.provide'd symbols.",
    metaVar = "ENTRYPOINT...",
    handler = StringArrayOptionHandler.class
  )
  List<String> entryPoints = new ArrayList<>();

  // https://github.com/google/closure-compiler/blob/036a6dd24c4b0831838a63f983d63670b1f1a9b6/src/com/google/javascript/jscomp/CommandLineRunner.java#L667
  @Option(
    name = "--tracer_mode",
    hidden = true,
    usage =
        "Shows the duration of each compiler pass and the impact to "
            + "the compiled output size. "
            + "Options: ALL, AST_SIZE, RAW_SIZE, TIMING_ONLY, OFF"
  )
  private CompilerOptions.TracerMode tracerMode = CompilerOptions.TracerMode.OFF;

  @Option(
    name = "--browserResolverStrippedPrefixes",
    usage = "A list of prefixes for absolute ES6 module paths, that would be replaced by '/'",
    handler = StringArrayOptionHandler.class
  )
  List<String> browserResolverStrippedPrefixes = new ArrayList<>();

  @Argument
  @Option(name = "--", handler = StopOptionHandler.class)
  List<String> arguments = new ArrayList<>();

  Depgraph depgraph;

  public CompilerOptions getCompilerOptions() {
    final CompilerOptions options = new CompilerOptions();
    options.setClosurePass(true);
    options.setTracerMode(this.tracerMode);
    // TODO(b/142973207): Set this to false after clutz supports native module checking
    options.setBadRewriteModulesBeforeTypecheckingThatWeWantToGetRidOf(true);

    if (this.entryPoints.isEmpty()) {
      options.setDependencyOptions(DependencyOptions.sortOnly());
    } else {
      ImmutableList<ModuleIdentifier> entryPointIdentifiers =
          this.entryPoints.stream().map(ModuleIdentifier::forClosure).collect(toImmutableList());
      options.setDependencyOptions(
          DependencyOptions.pruneLegacyForEntryPoints(entryPointIdentifiers));
    }

    // Turns off common warning messages, when PhaseOptimizer decides to skip some passes due to
    // unsupported code constructs. They are not very actionable to users, and do not seem to
    // affect the quality of produced .d.ts.
    Logger phaseLogger = Logger.getLogger("com.google.javascript.jscomp.PhaseOptimizer");
    phaseLogger.setLevel(Level.OFF);

    // All diagnostics are WARNINGs (or off) and thus ignored unless debug == true.
    // Only report issues (and fail for them) that are specifically causing problems for Clutz.
    // The idea is to not do a general sanity check of Closure code, just make sure Clutz works.
    // Report missing types as errors.
    options.setCheckGlobalNamesLevel(CheckLevel.ERROR);
    // Report duplicate definitions, e.g. for accidentally duplicated externs.
    options.setWarningLevel(DiagnosticGroups.DUPLICATE_VARS, CheckLevel.ERROR);

    // Late Provides are errors by default, but they do not prevent clutz from transpiling.
    options.setWarningLevel(DiagnosticGroups.LATE_PROVIDE, CheckLevel.OFF);

    // Always parse and analyze the latest language features closure supports.
    options.setLanguage(LanguageMode.ECMASCRIPT_NEXT);
    options.setLanguageOut(LanguageMode.ECMASCRIPT5);

    options.setModuleResolutionMode(ModuleLoader.ResolutionMode.BROWSER_WITH_TRANSFORMED_PREFIXES);
    ImmutableMap.Builder<String, String> builder = ImmutableMap.builder();
    for (String str : browserResolverStrippedPrefixes) {
      builder.put(str, "/");
    }
    options.setBrowserResolverPrefixReplacements(builder.build());

    if (closureEnv != null) {
      options.setEnvironment(closureEnv);
    }
    options.setCheckTypes(true);
    options.setInferTypes(true);
    // turns off optimizations.
    options.setChecksOnly(true);
    options.setPreserveDetailedSourceInfo(true);
    options.setParseJsDocDocumentation(Config.JsDocParsing.INCLUDE_DESCRIPTIONS_NO_WHITESPACE);
    options.clearConformanceConfigs();
    options.setAssumeForwardDeclaredForMissingTypes(true);
    options.setWarningLevel(DiagnosticGroups.MISSING_SOURCES_WARNINGS, CheckLevel.OFF);
    return options;
  }

  Options(String[] args) throws CmdLineException {
    CmdLineParser parser = new CmdLineParser(this);
    parser.parseArgument(args);
    depgraph = Depgraph.parseFrom(depgraphFiles);

    if (arguments.isEmpty()) {
      throw new CmdLineException(parser, "No files were given");
    }
  }

  Options() {}
}

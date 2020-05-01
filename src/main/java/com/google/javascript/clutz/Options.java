package com.google.javascript.clutz;

import static com.google.common.collect.ImmutableList.toImmutableList;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Sets;
import com.google.common.io.Files;
import com.google.javascript.jscomp.*;
import com.google.javascript.jscomp.CompilerOptions.LanguageMode;
import com.google.javascript.jscomp.deps.ModuleLoader;
import com.google.javascript.jscomp.parsing.Config;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;
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
    name = "--externs",
    usage = "list of files to read externs definitions (as separate args)",
    metaVar = "EXTERN...",
    handler = StringArrayOptionHandler.class
  )
  List<String> externs = new ArrayList<>();

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
    name = "--strict_deps",
    usage =
        "generates no modules for nonroots (but does generate types), so that nonroots "
            + "cannot be imported by TypeScript code."
  )
  boolean strictDeps = false;

  @Option(
    name = "--depgraphs_filter_sources",
    usage = "only include sources from the arguments list that appear in the given depgraphs"
  )
  boolean filterSourcesWithDepgraphs = false;

  @Option(
    name = "--closure_entry_points",
    usage =
        "only generate output for the given entry points to the program. Must be"
            + " goog.provide'd symbols.",
    metaVar = "ENTRYPOINT...",
    handler = StringArrayOptionHandler.class
  )
  List<String> entryPoints = new ArrayList<>();

  @Option(
    name = "--partialInput",
    usage =
        "allow input of incomplete programs. All unknown types will be treated as forward"
            + " declared."
  )
  boolean partialInput;

  @Option(
    name = "--skipEmitRegExp",
    usage =
        "Symbols in files that match this RegExp will not be included in the emit. Note that"
            + " the files would still be part of the internal compilation."
  )
  String skipEmitRegExp = null;

  @Option(
    name = "--collidingProvides",
    usage = "file containing a list of names that we know conflict with namespaces"
  )
  String collidingProvidesFile = null;

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
  // TODO(martinprobst): Remove when internal Google is upgraded to a more recent args4j
  // library that supports Pattern arguments.
  Pattern skipEmitPattern;
  Set<String> collidingProvides = new HashSet<>();

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
    if (partialInput) {
      options.setAssumeForwardDeclaredForMissingTypes(true);
      options.setWarningLevel(DiagnosticGroups.MISSING_SOURCES_WARNINGS, CheckLevel.OFF);
    }
    return options;
  }

  Options(String[] args) throws CmdLineException {
    CmdLineParser parser = new CmdLineParser(this);
    parser.parseArgument(args);
    if (skipEmitRegExp != null) {
      skipEmitPattern = Pattern.compile(skipEmitRegExp);
    }
    depgraph = Depgraph.parseFrom(depgraphFiles);
    if (filterSourcesWithDepgraphs) {
      // Clutz still takes the list of files to compile from the outside, because Closure depends
      // on source order in many places. The depgraph files are not sorted, build order is instead
      // established by the outside tool driving compilation (e.g. bazel).
      Set<String> merged = Sets.union(depgraph.getRoots(), depgraph.getNonroots());
      arguments.retainAll(merged);
    }

    if (!partialInput) {
      // set union command line externs and depgraph.externs.
      Set<String> allExterns = new LinkedHashSet<>();
      allExterns.addAll(depgraph.getRootExterns());
      allExterns.addAll(depgraph.getNonrootExterns());
      allExterns.addAll(externs);
      externs = new ArrayList<>(allExterns);
    }
    // Incremental clutz does not use the externs option in regular invocations. Since it is only
    // ran on a per js_library basis, there is no way to separate sources and externs.
    // For legacy reasons, it is seperately called on the externs_list's of files, but it those
    // invocations depgraphs are not used (since they don't exist for bundles of files).
    //
    // So either there are no externs present or no depgraphs present. In either case there is no
    // point doing any union/intersection of those.

    // Exclude externs that are already in the sources to avoid duplicated symbols.
    arguments.removeAll(externs);
    if (!strictDeps) {
      depgraph = depgraph.withNonrootsAsRoots();
    }
    if (arguments.isEmpty() && externs.isEmpty()) {
      throw new CmdLineException(parser, "No files or externs were given");
    }

    if (collidingProvidesFile != null) {
      try {
        collidingProvides.addAll(Files.readLines(new File(collidingProvidesFile), UTF_8));
      } catch (IOException e) {
        throw new RuntimeException("Error reading aliased names file " + collidingProvidesFile, e);
      }
    }
  }

  Options() {}
}

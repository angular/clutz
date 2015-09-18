package com.google.javascript.cl2dts;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.io.Files;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.ErrorHandler;
import com.google.javascript.jscomp.JSError;

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

  @Option(name = "--skipParseExterns",
      usage = "run faster by skipping the externs parsing (useful for tests)")
  boolean skipParseExterns;

  @Argument
  List<String> arguments = new ArrayList<>();

  public CompilerOptions getCompilerOptions() {
    final CompilerOptions options = new CompilerOptions();
    options.setClosurePass(true);
    options.setCheckGlobalNamesLevel(CheckLevel.ERROR);
    options.setCheckGlobalThisLevel(CheckLevel.ERROR);
    options.setCheckTypes(true);
    options.setInferTypes(true);
    options.setIdeMode(true); // So that we can query types after compilation.
    options.setErrorHandler(new ErrorHandler() {
      @Override
      public void report(CheckLevel level, JSError error) {
        throw new AssertionError(error.toString());
      }
    });
    return options;
  }

  Options(String[] args) throws CmdLineException {
    CmdLineParser parser = new CmdLineParser(this);
    parser.parseArgument(args);
    if (arguments.isEmpty()) {
      throw new CmdLineException(parser, "No files were given");
    }
  }

  Options(boolean skipParseExterns) {
    this.skipParseExterns = skipParseExterns;
  }

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

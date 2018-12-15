package com.google.javascript.clutz;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.collect.ImmutableList;
import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Representation of the data contained in a depgraph file.
 *
 * <p>This JSON file is produced by Bazel javascript rules, and describes the shape of the
 * dependency graph for a given rule. We use it to determine which inputs to the compiler are srcs
 * and which come from deps.
 */
class Depgraph {

  private final Set<String> roots = new LinkedHashSet<>();
  private final Set<String> nonroots = new LinkedHashSet<>();
  private final Set<String> rootExterns = new LinkedHashSet<>();
  private final Set<String> nonrootExterns = new LinkedHashSet<>();
  /**
   * Closure's internal name for goog.provide and goog.module symbols is incompatible, and in a
   * goog.module file, it's impossible to tell which is being referenced, so information is pulled
   * out of the depgraph, and later passed to ImportBasedMapBuilder to resolve the ambiguity.
   */
  private final Set<String> googProvides = new HashSet<>();

  private final Map<String, String> esModulesToGoogModuleId = new HashMap<>();

  private Depgraph() {}

  boolean isRoot(String fileName) {
    // roots can only be empty if no Depgraphs were passed in, in which case we accept all files.
    return roots.isEmpty() || roots.contains(fileName);
  }

  Depgraph withNonrootsAsRoots() {
    Depgraph res = new Depgraph();
    res.roots.addAll(roots);
    res.roots.addAll(nonroots);
    res.rootExterns.addAll(rootExterns);
    res.rootExterns.addAll(nonrootExterns);
    return res;
  }

  Set<String> getRoots() {
    return Collections.unmodifiableSet(roots);
  }

  Set<String> getNonroots() {
    return Collections.unmodifiableSet(nonroots);
  }

  Set<String> getRootExterns() {
    return Collections.unmodifiableSet(rootExterns);
  }

  Set<String> getNonrootExterns() {
    return Collections.unmodifiableSet(nonrootExterns);
  }

  Set<String> getGoogProvides() {
    return Collections.unmodifiableSet(googProvides);
  }

  Optional<String> getGoogModuleIdForEsModule(String fileName) {
    if (esModulesToGoogModuleId.containsKey(fileName)) {
      return Optional.of(esModulesToGoogModuleId.get(fileName));
    }
    return Optional.empty();
  }

  static Depgraph forRoots(Set<String> roots, Set<String> nonroots) {
    Depgraph result = new Depgraph();
    result.roots.addAll(roots);
    result.nonroots.addAll(nonroots);
    return result;
  }

  // TODO(alexeagle): consider parsing into an object graph rather than nested loops over List<?>.
  static Depgraph parseFrom(List<String> fileNames) {
    Depgraph result = new Depgraph();
    if (fileNames.isEmpty()) {
      return result;
    }

    for (String depgraphName : fileNames) {
      try {
        String depgraph = Files.asCharSource(new File(depgraphName), UTF_8).read();
        List<List<?>> list =
            new Gson()
                .fromJson(
                    depgraph,
                    new TypeToken<List<List<?>>>() {
                      /* empty */
                    }.getType());

        for (List<?> outer : list) {
          String key = (String) outer.get(0);
          @SuppressWarnings("unchecked")
          List<List<?>> value = (List<List<?>>) outer.get(1);
          result.collectFiles("roots".equals(key), value);
        }
      } catch (FileNotFoundException e) {
        throw new IllegalArgumentException("depgraph file not found: " + depgraphName, e);
      } catch (IOException e) {
        throw new RuntimeException("error reading depgraph file " + depgraphName, e);
      } catch (Exception e) {
        throw new RuntimeException("malformed depgraph: " + depgraphName, e);
      }
    }
    if (result.roots.isEmpty() && result.rootExterns.isEmpty()) {
      throw new IllegalStateException("No roots were found in the provided depgraphs files");
    }
    return result;
  }

  // Strip brackets from bazel's "[blaze-out/.../]foo/bar" path prefixes.
  private static final Pattern GENERATED_FILE = Pattern.compile("^\\[([^]]+)\\]");

  private void collectFiles(boolean isRoots, List<List<?>> fileList) {
    for (List<?> rootDescriptor : fileList) {
      String fileName = (String) rootDescriptor.get(0);
      // *-bootstrap.js are automatically added to every rule by Bazel
      if (fileName.endsWith("-bootstrap.js")) {
        continue;
      }
      @SuppressWarnings("unchecked")
      List<List<?>> fileProperties = (List<List<?>>) rootDescriptor.get(1);
      boolean isExterns = false;
      boolean isGoogProvide = true;
      boolean isEsModule = false;
      List<String> provides = new ArrayList<>();
      for (List<?> tuple : fileProperties) {
        String key = (String) tuple.get(0);
        if ("is_externs".equals(key) && Boolean.TRUE.equals(tuple.get(1))) {
          isExterns = true;
          break;
        }
        if ("load_flags".equals(key)) {
          // load flags is a list of lists of strings ie [["lang","es6"],["module","goog"]]
          @SuppressWarnings("unchecked")
          List<List<String>> loadFlags = (List<List<String>>) tuple.get(1);
          if (loadFlags.contains(ImmutableList.of("module", "goog"))) {
            isGoogProvide = false;
          }
          if (loadFlags.contains(ImmutableList.of("module", "es6"))) {
            isEsModule = true;
          }
        }
        if ("provides".equals(key)) {
          // provides is a list of strings, where the first element is the file name with a prefix
          // and all the remaining elements are the provides from that file
          @SuppressWarnings("unchecked")
          List<String> provideList = (List<String>) tuple.get(1);
          if (provideList.size() > 1) {
            provides.addAll(provideList.subList(1, provideList.size()));
          }
        }
      }
      fileName = GENERATED_FILE.matcher(fileName).replaceAll("$1");
      if (isExterns && isRoots) {
        rootExterns.add(fileName);
      } else if (isExterns && !isRoots) {
        nonrootExterns.add(fileName);
      } else if (isRoots) {
        roots.add(fileName);
      } else {
        nonroots.add(fileName);
      }
      if (isEsModule) {
        if (provides.size() == 1) {
          esModulesToGoogModuleId.put(fileName, provides.get(0));
        } else if (provides.size() > 1) {
          throw new RuntimeException(
              "Expected an ES Module to have at most one provide (from a goog.declareModuleId). "
                  + "Instead got: "
                  + provides);
        } else {
          // We don't have any way to import an ES Module from TypeScript that does not use
          // goog.declareModuleId, so there's nothing for us to do here.
        }
      } else if (isGoogProvide) {
        googProvides.addAll(provides);
      }
    }
  }

  @Override
  public String toString() {
    return "<Depgraph \n  roots: "
        + roots
        + "\n  nonroots: "
        + nonroots
        + "\n  rootExterns: "
        + rootExterns
        + "\n  nonrootExterns: "
        + nonrootExterns
        + "\n  googProvides: "
        + googProvides
        + "\n  esModulesToGoogModuleId: "
        + esModulesToGoogModuleId
        + "\n>";
  }
}

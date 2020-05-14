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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Representation of the data contained in a depgraph file.
 *
 * <p>This JSON file is produced by Bazel javascript rules, and describes the shape of the
 * dependency graph for a given rule. We use it to determine which inputs to the compiler are srcs
 * and which come from deps.
 */
class Depgraph {

  /**
   * Closure's internal name for goog.provide and goog.module symbols is incompatible, and in a
   * goog.module file, it's impossible to tell which is being referenced, so information is pulled
   * out of the depgraph, and later passed to ImportBasedMapBuilder to resolve the ambiguity.
   */
  private final Set<String> googProvides = new HashSet<>();

  private Depgraph() {}

  Set<String> getGoogProvides() {
    return Collections.unmodifiableSet(googProvides);
  }

  static Depgraph forRoots(Set<String> roots, Set<String> nonroots) {
    Depgraph result = new Depgraph();
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
          @SuppressWarnings("unchecked")
          List<List<?>> value = (List<List<?>>) outer.get(1);
          result.collectFiles(value);
        }
      } catch (FileNotFoundException e) {
        throw new IllegalArgumentException("depgraph file not found: " + depgraphName, e);
      } catch (IOException e) {
        throw new RuntimeException("error reading depgraph file " + depgraphName, e);
      } catch (Exception e) {
        throw new RuntimeException("malformed depgraph: " + depgraphName, e);
      }
    }

    return result;
  }

  // Strip brackets from bazel's "[blaze-out/.../]foo/bar" path prefixes.

  private void collectFiles(List<List<?>> fileList) {
    for (List<?> rootDescriptor : fileList) {
      String fileName = (String) rootDescriptor.get(0);
      // *-bootstrap.js are automatically added to every rule by Bazel
      if (fileName.endsWith("-bootstrap.js")) {
        continue;
      }
      @SuppressWarnings("unchecked")
      List<List<?>> fileProperties = (List<List<?>>) rootDescriptor.get(1);
      boolean isGoogProvide = true;
      List<String> provides = new ArrayList<>();
      for (List<?> tuple : fileProperties) {
        String key = (String) tuple.get(0);
        if ("is_externs".equals(key) && Boolean.TRUE.equals(tuple.get(1))) {
          break;
        }
        if ("load_flags".equals(key)) {
          // load flags is a list of lists of strings ie [["lang","es6"],["module","goog"]]
          @SuppressWarnings("unchecked")
          List<List<String>> loadFlags = (List<List<String>>) tuple.get(1);
          if (loadFlags.contains(ImmutableList.of("module", "goog"))) {
            isGoogProvide = false;
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

      if (isGoogProvide) {
        googProvides.addAll(provides);
      }
    }
  }
}

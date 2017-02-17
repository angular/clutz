package com.google.javascript.clutz;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
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
  private final Set<String> externs = new LinkedHashSet<>();

  private Depgraph() {}

  boolean isRoot(String fileName) {
    // roots can only be empty if no Depgraphs were passed in, in which case we accept all files.
    return roots.isEmpty() || roots.contains(fileName);
  }

  Depgraph withNonrootsAsRoots() {
    Depgraph res = new Depgraph();
    res.roots.addAll(roots);
    res.roots.addAll(nonroots);
    res.externs.addAll(externs);
    return res;
  }

  Set<String> getRoots() {
    return Collections.unmodifiableSet(roots);
  }

  Set<String> getNonroots() {
    return Collections.unmodifiableSet(nonroots);
  }

  Set<String> getExterns() {
    return Collections.unmodifiableSet(externs);
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
        String depgraph = Files.toString(new File(depgraphName), UTF_8);
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
    if (result.roots.isEmpty() && result.externs.isEmpty()) {
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
      for (List<?> tuple : fileProperties) {
        String key = (String) tuple.get(0);
        if ("is_externs".equals(key) && Boolean.TRUE.equals(tuple.get(1))) {
          isExterns = true;
          break;
        }
      }
      fileName = GENERATED_FILE.matcher(fileName).replaceAll("$1");
      if (isExterns) {
        externs.add(fileName);
      } else if (isRoots) {
        roots.add(fileName);
      } else {
        nonroots.add(fileName);
      }
    }
  }
}

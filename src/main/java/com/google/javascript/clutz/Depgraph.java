package com.google.javascript.clutz;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Representation of the data contained in a depgraph file.
 *
 * This JSON file is produced by Bazel javascript rules, and describes the shape of the dependency
 * graph for a given rule. We use it to determine which inputs to the compiler are srcs and which
 * come from deps.
 */
public class Depgraph {

  private final Set<String> roots;

  public Depgraph(Set<String> roots) {
    this.roots = roots;
  }

  public boolean isRoot(String fileName) {
    // roots can only be empty if no Depgraphs were passed in, in which case we accept all files.
    return roots.isEmpty() || roots.contains(fileName);
  }

  public Set<String> getRoots() {
    return roots;
  }

  // TODO(alexeagle): consider parsing into an object graph rather than nested loops over List<?>.
  public static Depgraph parseFrom(boolean allFilesAreRoots, List<String> fileNames) {
    if (fileNames.isEmpty()) {
      return new Depgraph(Collections.<String>emptySet());
    }

    Set<String> roots = new LinkedHashSet<>();
    for (String depgraphName : fileNames) {
      try {
        String depgraph = Files.toString(new File(depgraphName), UTF_8);
        List<List<?>> list =
            new Gson().fromJson(depgraph, new TypeToken<List<List<?>>>() { /* empty */ }.getType());
        for (List<?> outer : list) {
          String key = (String) outer.get(0);
          @SuppressWarnings("unchecked")
          List<List<?>> value = (List<List<?>>) outer.get(1);
          List<String> files = getFiles(value);
          if (allFilesAreRoots || "roots".equals(key)) {
            roots.addAll(files);
          }
        }
      } catch (FileNotFoundException e) {
        throw new IllegalArgumentException("depgraph file not found: " + depgraphName, e);
      } catch (IOException e) {
        throw new RuntimeException("error reading depgraph file " + depgraphName, e);
      } catch (Exception e) {
        throw new RuntimeException("malformed depgraph: " + depgraphName, e);
      }
    }
    if (roots.isEmpty()) {
      throw new IllegalStateException("No roots were found in the provided depgraphs files");
    }
    return new Depgraph(roots);
  }

  // Strip brackets from bazel's "[blaze-out/.../]foo/bar" path prefixes.
  private static final Pattern GENERATED_FILE = Pattern.compile("^\\[([^]]+)\\]");

  private static List<String> getFiles(List<List<?>> fileList) {
    ArrayList<String> files = new ArrayList<>();
    for (List<?> rootDescriptor : fileList) {
      String fileName = (String) rootDescriptor.iterator().next();
      // *-bootstrap.js are automatically added to every rule by Bazel
      if (!fileName.endsWith("-bootstrap.js")) {
        fileName = GENERATED_FILE.matcher(fileName).replaceAll("$1");
        files.add(fileName);
      }
    }
    return files;
  }
}

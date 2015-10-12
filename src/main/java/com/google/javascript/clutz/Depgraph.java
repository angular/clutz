package com.google.javascript.clutz;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

/**
 * Representation of the data contained in a depgraph file.
 * This JSON file is produced by Bazel javascript rules, and describes the shape
 * of the dependency graph for a given rule.
 * We use it to determine which inputs to the compiler are srcs and which come from deps.
 */
public class Depgraph {

  private final List<String> roots;
  public Depgraph(List<String> roots) {
    this.roots = roots;
  }

  // TODO(alexeagle): consider parsing into an object graph rather than these nested loops
  @SuppressWarnings("unchecked")
  public static Depgraph parseFrom(List<String> fileContents) {
    if (fileContents.isEmpty()) {
      return new Depgraph(Collections.<String>emptyList());
    }

    List<String> roots = new ArrayList<>();
    for (String depgraph : fileContents) {
      try {
        List<List<?>> list = new Gson().fromJson(depgraph, new TypeToken<List<List<?>>>(){}.getType());
        for (List<?> outer : list) {
          Iterator<?> i = outer.iterator();
          if ("roots".equals(i.next())) {
            List<List<?>> rootsList = (List<List<?>>) i.next();
            for (List<?> rootDescriptor : rootsList) {
              String filename = (String) rootDescriptor.iterator().next();
              // *-bootstrap.js are automatically added to every rule by Bazel
              if (!filename.endsWith("-bootstrap.js")) {
                roots.add(filename);
              }
            }
          }
        }
      } catch (Exception e) {
        throw new RuntimeException("malformed depgraphs content:\n" + depgraph, e);
      }
    }
    if (roots.isEmpty()) {
      throw new IllegalStateException("No roots were found in the provided depgraphs files");
    }
    return new Depgraph(roots);
  }

  public List<String> getRoots() {
    return roots;
  }
}

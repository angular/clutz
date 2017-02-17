package com.google.javascript.gents;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

/** Utility methods for file path resolution. */
public class PathUtil {
  private String rootpath = null;

  public PathUtil(String root) {
    this.rootpath = root;
  }

  /**
   * Returns the file name without its file extension or path. The result does not include the
   * '{@code .}'.
   */
  String getFilePathWithoutExtension(String filepath) {
    return removeExtension(new File(filepath).getPath());
  }

  /** Returns the file name without its file extension. */
  String removeExtension(String filename) {
    int dotIndex = filename.lastIndexOf(".");
    return (dotIndex == -1) ? filename : filename.substring(0, dotIndex);
  }

  /**
   * Returns the proper import path for a referenced file. Defaults to an absolute path if the
   * referenced file is more than 2 directories above the current source file.
   */
  String getImportPath(String sourceFile, String referencedFile) {
    referencedFile = removeExtension(referencedFile);
    String relativePath = getRelativePath(sourceFile + "/..", referencedFile);
    if (rootpath != null && relativePath.startsWith("../..")) {
      return getRelativePath(rootpath, referencedFile);
    } else {
      return relativePath.startsWith(".") ? relativePath : "./" + relativePath;
    }
  }

  /** Returns the relative path between the source file and the referenced module file. */
  String getRelativePath(String from, String to) {
    Path fromPath = Paths.get(from).toAbsolutePath().normalize();
    Path toPath = Paths.get(to).toAbsolutePath().normalize();
    Path importPath = fromPath.relativize(toPath).normalize();
    return importPath.toString();
  }
}

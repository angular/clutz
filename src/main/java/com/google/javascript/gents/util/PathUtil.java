package com.google.javascript.gents.util;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

/** Utility methods for file path resolution. */
public class PathUtil {
  private final String rootpath;
  private final String absolutePrefix;

  public PathUtil(String root, String absolutePrefix) {
    this.rootpath = root;
    this.absolutePrefix = absolutePrefix;
  }

  /**
   * Returns the file name without its file extension or path. The result does not include the
   * '{@code .}'.
   */
  public String getFilePathWithoutExtension(String filepath) {
    return removeExtension(new File(filepath).getPath());
  }

  /** Returns the file name without its file extension. */
  public String removeExtension(String filename) {
    int dotIndex = filename.lastIndexOf(".");
    return (dotIndex == -1) ? filename : filename.substring(0, dotIndex);
  }

  /**
   * Returns the proper import path for a referenced file. Defaults to an absolute path if the
   * referenced file is more than 2 directories above the current source file.
   *
   * <p>NOTE: the string returned from this is not really a root-based path on disk. It only makes
   * sense as an input to a 'from '...'' clause.
   */
  public String getImportPath(String sourceFile, String referencedFile) {
    referencedFile = removeExtension(referencedFile);
    String relativePath = getRelativePath(sourceFile + "/..", referencedFile);
    if (relativePath.startsWith("../..")) {
      return absolutePrefix + "/" + getRelativePath(rootpath, referencedFile);
    } else {
      return relativePath.startsWith(".") ? relativePath : "./" + relativePath;
    }
  }

  /** Returns the relative path between the source file and the referenced module file. */
  public String getRelativePath(String from, String to) {
    Path fromPath = Paths.get(from).toAbsolutePath().normalize();
    Path toPath = Paths.get(to).toAbsolutePath().normalize();
    Path importPath = fromPath.relativize(toPath).normalize();
    return importPath.toString();
  }
}

package com.google.javascript.gents;

import com.google.common.collect.ImmutableMap;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.rhino.Node;
import java.io.IOException;
import javax.annotation.Nullable;

/**
 * A class used to get the original literal text for a JavaScript node in the AST.
 *
 * <p>This class is needed because a <code>com.google.javascript.rhino.Node</code> has a method for
 * accessing the node's source filename but not its <code>SourceFile</code>. This class addresses
 * this by mapping a source filename to a <code>SourceFile</code>.
 */
public class SourceExtractor {

  /**
   * Maps a source file name from <code>Node.getSourceFileName()</code> to its associated <code>
   * SourceFile</code>.
   */
  private final ImmutableMap<String, SourceFile> sourceFiles;

  public SourceExtractor(Iterable<SourceFile> sourceFiles) {
    ImmutableMap.Builder<String, SourceFile> builder = ImmutableMap.builder();
    for (SourceFile sf : sourceFiles) {
      builder.put(sf.getName(), sf);
    }
    this.sourceFiles = builder.build();
  }

  /**
   * Gets the source file name for the given node or <code>null</code> if the node doesn't have a
   * source filename.
   *
   * @param node The node to analyze. This value can be <code>null</code>.
   * @return The node's source filename or <code>null</code> the source filename could not be
   *     determined or if <code>node</code> is <code>null</code>.
   */
  @Nullable
  private static String getSourceFileName(Node node) {
    if (node == null) {
      return null;
    }

    String name = node.getSourceFileName();
    if (name != null) {
      return name;
    }

    return getSourceFileName(node.getParent());
  }

  /**
   * Gets the original literal code for a node or <code>null</code>.
   *
   * @param node The node to process.
   * @return The literal code for the node or <code>null</code> if it could not be determined.
   * @throws IOException Thrown if there was a problem loading the source file.
   */
  @Nullable
  public String getSource(Node node) throws IOException {
    String name = getSourceFileName(node);
    if (!this.sourceFiles.containsKey(name)) {
      return null;
    }

    SourceFile sf = this.sourceFiles.get(name);
    int offset = node.getSourceOffset();
    int length = node.getLength();

    if (offset < 0) {
      return null;
    }

    return sf.getCode().substring(offset, offset + length);
  }
}

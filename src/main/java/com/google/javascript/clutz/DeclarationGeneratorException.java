package com.google.javascript.clutz;

import com.google.common.base.Joiner;
import com.google.javascript.jscomp.JSError;

import java.util.List;

/**
 * An exception used to communicate errors from {@link DeclarationGenerator#generateDeclarations()}.
 */
public class DeclarationGeneratorException extends RuntimeException {
  final List<JSError> errors;

  public DeclarationGeneratorException(String message, List<JSError> errors) {
    super(message + "\n" + Joiner.on('\n').join(errors));
    this.errors = errors;
  }
}

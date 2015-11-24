package com.google.javascript.clutz;

import com.google.common.base.Function;
import com.google.common.base.Joiner;
import com.google.common.collect.Iterables;
import com.google.javascript.jscomp.ErrorFormat;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.MessageFormatter;
import com.google.javascript.jscomp.SourceExcerptProvider;

import java.util.List;

/**
 * An exception used to communicate errors from {@link DeclarationGenerator#generateDeclarations()}.
 */
public class DeclarationGeneratorException extends RuntimeException {
  public DeclarationGeneratorException(SourceExcerptProvider excerptProv, String message,
      List<JSError> errors) {
    super(message + "\n" + formatErrors(excerptProv, errors));
  }

  private static String formatErrors(SourceExcerptProvider excerptProv, List<JSError> errors) {
    final MessageFormatter formatter = ErrorFormat.MULTILINE.toFormatter(excerptProv, true);
    String formattedErrors =
        Joiner.on('\n').join(Iterables.transform(errors, new Function<JSError, String>() {
          @Override
          public String apply(JSError error) {
            return formatter.formatError(error);
          }
        }));
    return formattedErrors;
  }
}

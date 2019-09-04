package com.google.javascript;

import com.google.javascript.clutz.DeclarationGenerator;
import com.google.javascript.gents.TypeScriptGenerator;

public class Main {
  public static void main(String[] args) {
    if (args.length == 0) {
      System.out.println(
          String.format("Usage: %s <clutz|gents> [...args]", Main.class.getSimpleName()));
      System.exit(1);
    }

    String tool = args[0];
    String[] subArgs = new String[args.length - 1];
    System.arraycopy(args, 1, subArgs, 0, subArgs.length);

    if ("clutz".equals(tool)) {
      DeclarationGenerator.main(subArgs);
    } else if ("gents".equals(tool)) {
      TypeScriptGenerator.main(subArgs);
    }
  }
}

package com.google.javascript.clutz;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.collect.ImmutableList.toImmutableList;
import static com.google.common.collect.Iterables.transform;
import static com.google.javascript.rhino.jstype.JSTypeNative.ALL_TYPE;
import static com.google.javascript.rhino.jstype.JSTypeNative.ARRAY_TYPE;
import static com.google.javascript.rhino.jstype.JSTypeNative.OBJECT_TYPE;
import static com.google.javascript.rhino.jstype.JSTypeNative.STRING_TYPE;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.apache.commons.text.StringEscapeUtils.escapeEcmaScript;

import com.google.common.base.CharMatcher;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Collections2;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.ListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Ordering;
import com.google.common.collect.Sets;
import com.google.common.io.Files;
import com.google.javascript.jscomp.AbstractCommandLineRunner;
import com.google.javascript.jscomp.CompilerInput;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.ErrorFormat;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.TypedScope;
import com.google.javascript.jscomp.TypedVar;
import com.google.javascript.rhino.InputId;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.StaticSourceFile;
import com.google.javascript.rhino.jstype.EnumElementType;
import com.google.javascript.rhino.jstype.EnumType;
import com.google.javascript.rhino.jstype.FunctionType;
import com.google.javascript.rhino.jstype.JSType;
import com.google.javascript.rhino.jstype.JSTypeNative;
import com.google.javascript.rhino.jstype.JSTypeRegistry;
import com.google.javascript.rhino.jstype.NamedType;
import com.google.javascript.rhino.jstype.NoResolvedType;
import com.google.javascript.rhino.jstype.NoType;
import com.google.javascript.rhino.jstype.ObjectType;
import com.google.javascript.rhino.jstype.ProxyObjectType;
import com.google.javascript.rhino.jstype.TemplateType;
import com.google.javascript.rhino.jstype.TemplateTypeMap;
import com.google.javascript.rhino.jstype.TemplatizedType;
import com.google.javascript.rhino.jstype.UnionType;
import com.google.javascript.rhino.jstype.Visitor;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.zip.ZipFile;
import javax.annotation.Nullable;
import org.kohsuke.args4j.CmdLineException;

/** A tool that generates {@code .d.ts} declarations from a Google Closure JavaScript program. */
class DeclarationGenerator {

  /**
   * Words for which we cannot generate 'namespace foo.Word {}'; Instead clutz tries to roll them up
   * into properties of the parent namespace, but that can be lossy.
   *
   * <p>To regenerate this list use the following script with a list of candidates.
   *
   * <pre>$ for k in $(cat /tmp/keywords); do echo "namespace foo.$k {};" > /tmp/test.ts; \
   * tsc /tmp/test.ts >/dev/null || echo \"$k\",; done;
   * </pre>
   */
  private static final ImmutableSet<String> RESERVED_JS_WORDS =
      ImmutableSet.of(
          "break",
          "case",
          "catch",
          "class",
          "let",
          "continue",
          "debugger",
          "default",
          "delete",
          "do",
          "else",
          "enum",
          "export",
          "extends",
          "false",
          "finally",
          "for",
          "function",
          "if",
          "import",
          "in",
          "instanceof",
          "new",
          "null",
          "return",
          "super",
          "switch",
          "this",
          "throw",
          "true",
          "try",
          "typeof",
          "var",
          "void",
          "while",
          "with");

  /**
   * Incremental clutz cannot infer class aliases like:
   *
   * <pre>
   *   /** @constructor *
   *   an.KlassAlias = some.Missing;
   * </pre>
   *
   * Closure reports an.KlassAlias as regular empty class. In order to emit the correct clutz
   * description for now we work-around this issue by hardcoding some known aliases.
   *
   * <p>So far this works only for classes with no generic type parameters.
   */
  private static final ImmutableMap<String, String> KNOWN_CLASS_ALIASES =
      ImmutableMap.of(
          "goog.log.Logger", "goog.debug.Logger",
          "goog.log.Level", "goog.debug.Logger.Level",
          "goog.log.LogRecord", "goog.debug.LogRecord");

  private static final String GOOG_BASE_NAMESPACE = "goog";

  private static final String MODULE_PREFIX = "module$exports$";

  private static final Splitter DOT_SPLITTER = Splitter.on('.');

  public static void main(String[] args) {
    Options options = null;
    try {
      options = new Options(args);
    } catch (CmdLineException e) {
      System.err.println(e.getMessage());
      System.err.println("Usage: clutz [options...] arguments...");
      e.getParser().printUsage(System.err);
      System.err.println();
      System.exit(1);
    }
    try {
      DeclarationGenerator generator = new DeclarationGenerator(options);
      generator.generateDeclarations();
      if (generator.hasErrors()) {
        // Already reported through the print stream.
        System.exit(2);
      }
    } catch (Exception e) {
      e.printStackTrace(System.err);
      System.err.println("Uncaught exception in clutz, exiting.");
      System.exit(3);
    }
    System.exit(0);
  }

  static final DiagnosticType CLUTZ_MISSING_TYPES =
      DiagnosticType.error(
          "CLUTZ_MISSING_TYPES",
          "A dependency does not compile because it is missing some types. This is often caused by"
              + " the referenced code missing dependencies or by missing externs in your build"
              + " rule.");

  private JSType unknownType;
  private JSType numberType;
  private JSType stringType;

  /**
   * Iterator is the basic type that describes iteration - .next method. Iterable is the interface
   * with the one property - [Symbol.iterator]: Iterator.
   *
   * <p>Both TS and JS agree up to here. However, they have two different solutions for how to mix
   * those.
   *
   * <p>In TypeScript there is IterableIterator that extends Iterator and has: [Symbol.iterator]:
   * IterableIterator.
   *
   * <p>In Closure there is IterableIterator that simply extends Iterator and Iterable.
   *
   * <p>Apart from the name swap - IterableIterator and IterableIterator disagree on the
   * [Symbol.iterator] type.
   */
  @Nullable private JSType iterableType;

  @Nullable private JSType iteratorIterableType;

  @Nullable private JSType arrayType;

  private final Options opts;
  private final InitialParseRetainingCompiler compiler;
  private final ClutzErrorManager errorManager;
  private StringWriter out = new StringWriter();

  /** If symbols x.y.z and x.y.w exist, childListMap['x.y'] contains the TypedVars for z and w. */
  private final ListMultimap<String, TypedVar> childListMap = ArrayListMultimap.create();

  /**
   * Maps types to names for all emitted typedefs, so that further type walks just use the name.
   *
   * <p>This is a reverse subset of the private map namesToTypes that Closure keeps in TypeRegistry.
   *
   * <p>Currently, this map only contains templatized types and record types.
   */
  private final Map<JSType, String> typedefs = new HashMap<>();

  /**
   * Aggregates all emitted types, used in a final pass to find types emitted in type position but
   * not declared, possibly due to missing goog.provides.
   */
  private final Set<String> typesUsed = new LinkedHashSet<>();

  /**
   * In partial mode, closure doesn't know the correct name of imported symbols, and importRenameMap
   * is used to store the mappings from the closure supplied names to the correct names.
   */
  private Map<String, String> importRenameMap = new LinkedHashMap<>();

  /**
   * In partial mode, closure doesn't give proper types for reexported symbols. This map contains
   * potential aliases for reexported types. See AliasMapBuilder for details.
   */
  private Map<String, String> aliasMap = new LinkedHashMap<>();

  /**
   * declareLegacyNamespace modules declare goog.provides symbols, but depgraph analysis shows them
   * as goog.modules. This map contains aliases for the symbols in goog.module style, so they can be
   * imported from other goog.modules. See LegacyNamespaceReexportMapBuilder for more details.
   */
  private Map<String, String> legacyNamespaceReexportMap = new LinkedHashMap<>();

  /** If true, add all the import rename map entries to the output as comments in the .d.ts. */
  private final boolean PRINT_IMPORT_RENAME_MAP = false;

  /**
   * If one file defines a name and another uses it as a namespace, we have the
   * Constants.COLLDING_PROVIDE_ALIAS_POSTFIX workaround. In partial mode, Clutz can't see all
   * definitions of a name, so the list of names that require aliases must be passed as an input.
   */
  private Set<String> collidingProvides = new LinkedHashSet<>();

  DeclarationGenerator(Options opts) {
    this.opts = opts;
    this.compiler = new InitialParseRetainingCompiler();
    compiler.disableThreads();
    this.errorManager =
        new ClutzErrorManager(
            System.err, ErrorFormat.MULTILINE.toFormatter(compiler, true), opts.debug);
    compiler.setErrorManager(errorManager);
    // Calling compiler.getTypeRegistry() is not safe here,
    // because it initializes some internal compiler structures.
    // We should pass the correct CompilerOptions, before that.
  }

  boolean hasErrors() {
    return errorManager.getErrorCount() > 0;
  }

  /**
   * Precompute the list of children symbols for all top-scope symbols.
   *
   * <p>I.e. For each x.y -> [x.y.z, x.y.w]
   */
  void precomputeChildLists() {
    for (TypedVar var : compiler.getTopScope().getAllSymbols()) {
      String namespace = getNamespace(var.getName());
      if (!namespace.equals("")) {
        childListMap.put(namespace, var);
      }
    }
  }

  /**
   * Finds all typedefs in the program and build a Type -> typedef name mapping. The mapping is
   * needed because when walking type definitions closure inlines the typedefs values.
   */
  void collectTypedefs() {
    for (TypedVar var : compiler.getTopScope().getAllSymbols()) {
      if (shouldSkipVar(var)) {
        continue;
      }
      // In Closure, unlike TypeScript there is no pure type space. Thus even typedefs declare
      // symbols. The type of the symbol corresponding to the typedef is *not* the same as the type
      // declared by the typedef.
      JSType type = var.getType();
      if (type == null
          || !isTypedef(type)
          || var.getName().startsWith("window.")
          || isPrivate(var.getJSDocInfo())) {
        continue;
      }

      JSType realType = compiler.getTypeRegistry().getGlobalType(var.getName());
      if (realType != null
          && shouldEmitTypedefByName(realType)
          && !typedefs.containsKey(realType)
          && !PlatformSymbols.TYPESCRIPT_LIB_D_TS.contains(var.getName())
          && !PlatformSymbols.CLOSURE_EXTERNS_NOT_USED_IN_TYPESCRIPT.contains(var.getName())) {
        typedefs.put(realType, var.getName());
      }
    }
  }

  /**
   * Whether the typedef should be emitted by name or by the type it is defining.
   *
   * <p>Because, we do not access the original type signature, the replacement is done for all
   * references of the type (through the typedef or direct). Thus it is undesirable to always emit
   * by name. For example:
   *
   * <pre>
   * \@constructor A;
   * \@typedef {A} B;
   * \@const {A} var a;
   * </pre>
   *
   * If we emit the name, we would emit `var a: B;`, which is undesirable (consider A being string).
   *
   * <p>For now, only emit by name typedefs that are unlikely to have more than one name referring
   * to them - record types, templatized types and function types.
   */
  private boolean shouldEmitTypedefByName(JSType realType) {
    return realType.isRecordType() || realType.isTemplatizedType() || realType.isFunctionType();
  }

  void generateDeclarations() {
    List<SourceFile> sourceFiles = new ArrayList<>();

    for (String source : opts.arguments) {
      if (!source.endsWith(".zip")) {
        sourceFiles.add(SourceFile.fromPath(Paths.get(source), UTF_8));
        continue;
      }

      getJsEntryPathsFromZip(source).stream()
          .map(p -> SourceFile.fromPath(p, UTF_8))
          .forEach(sourceFiles::add);
    }
    List<SourceFile> externFiles = new ArrayList<>();
    for (String extern : opts.externs) {
      externFiles.add(SourceFile.fromPath(Paths.get(extern), UTF_8));
    }
    if (opts.closureEnv != null) {
      externFiles.addAll(getDefaultExterns(opts));
    }
    String result = generateDeclarations(sourceFiles, externFiles, opts.depgraph);

    if ("-".equals(opts.output)) {
      System.out.println(result);
    } else {
      File output = new File(opts.output);
      try {
        Files.asCharSink(output, UTF_8).write(result);
      } catch (IOException e) {
        throw new IllegalArgumentException("Unable to write to file " + opts.output, e);
      }
    }
  }

  /**
   * Helper function helps read the entries in a zipfile and returns a list of only the javascript
   * files (i.e files ending in .js).
   *
   * <p>Closure supports loading source files as {@code foo.zip!/path/in/zip.js}.
   */
  static List<Path> getJsEntryPathsFromZip(String source) {
    try (ZipFile zipFile = new ZipFile(source)) {
      return zipFile.stream()
          .filter(e -> !e.isDirectory())
          .filter(e -> e.getName().endsWith(".js"))
          .map(e -> source + "!/" + e.getName())
          .map(Paths::get)
          .collect(Collectors.toList());
    } catch (IOException e) {
      throw new RuntimeException("failed to read zip file " + source, e);
    }
  }

  String generateDeclarations(
      List<SourceFile> sourceFiles, List<SourceFile> externs, Depgraph depgraph)
      throws AssertionError {
    // Compile should always be first here, because it sets internal state.
    compiler.compile(externs, sourceFiles, opts.getCompilerOptions());
    if (opts.partialInput) {
      importRenameMap =
          new ImportRenameMapBuilder()
              .build(compiler.getParsedInputs(), opts.depgraph.getGoogProvides());
      aliasMap =
          new AliasMapBuilder().build(compiler.getParsedInputs(), opts.depgraph.getGoogProvides());
      legacyNamespaceReexportMap =
          new LegacyNamespaceReexportMapBuilder()
              .build(compiler.getParsedInputs(), opts.depgraph.getGoogProvides());
      collidingProvides = opts.collidingProvides;
    }

    unknownType = compiler.getTypeRegistry().getNativeType(JSTypeNative.UNKNOWN_TYPE);
    numberType = compiler.getTypeRegistry().getNativeType(JSTypeNative.NUMBER_TYPE);
    stringType = compiler.getTypeRegistry().getNativeType(JSTypeNative.STRING_TYPE);

    iterableType = compiler.getTypeRegistry().getGlobalType("Iterable");
    iteratorIterableType = compiler.getTypeRegistry().getGlobalType("IteratorIterable");

    arrayType = compiler.getTypeRegistry().getGlobalType("Array");
    // TODO(rado): replace with null and do not emit file when errors.
    String dts = "";
    // If there is an error top scope is null.
    if (compiler.getTopScope() != null) {
      precomputeChildLists();
      collectTypedefs();
      dts = produceDts(depgraph);
    }
    errorManager.doGenerateReport();
    return dts;
  }

  private String getNamespace(String input) {
    int dotIdx = input.lastIndexOf('.');
    if (dotIdx == -1) {
      return "";
    }
    return input.substring(0, dotIdx);
  }

  String produceDts(Depgraph depgraph) {
    out = new StringWriter();

    // Note: the specific emit of this header is depended upon by tsickle.
    emitComment("generated by clutz.");

    // Tree sets for consistent order.
    TreeSet<String> provides = new TreeSet<>();
    Set<String> rewrittenProvides = new TreeSet<>();
    Set<String> transitiveProvides = new TreeSet<>();
    Map<String, SourceFile> provideToFile = new HashMap<>();

    for (CompilerInput compilerInput : compiler.getInputsById().values()) {
      if (shouldSkipSourceFile(compilerInput.getSourceFile())) {
        continue;
      }
      Collection<String> inputProvides = compilerInput.getProvides();
      Collection<String> filteredProvides = new ArrayList<>();
      // It appears closure reports 'module$...filepath...' provides
      // for files that have no goog.provide or goog.module.
      // Such files cannot be really imported by typescript, so we do not
      // produce a .d.ts for them.
      // Note: It appears that in the github test environment these provides start with
      // `module$src$<filepath>`, while internally they miss the "src" and it is just
      // `module$<filepath>.
      for (String p : inputProvides) {
        if (!p.startsWith("module$")) {
          filteredProvides.add(p);
        }
      }
      transitiveProvides.addAll(filteredProvides);
      String originalPath = compilerInput.getSourceFile().getOriginalPath();
      if (depgraph.isRoot(originalPath)) {
        for (String provide : filteredProvides) {
          provideToFile.put(provide, compilerInput.getSourceFile());
        }
        provides.addAll(filteredProvides);
      }
    }

    if (PRINT_IMPORT_RENAME_MAP) {
      emitComment(String.format("import rename map contains %d entries", importRenameMap.size()));
      for (Entry<String, String> e : importRenameMap.entrySet()) {
        emitComment(String.format("Rename %s to %s", e.getKey(), e.getValue()));
      }
      emitComment(String.format("alias map contains %d entries", aliasMap.size()));
      for (Entry<String, String> e : aliasMap.entrySet()) {
        emitComment(String.format("Alias %s to %s", e.getKey(), e.getValue()));
      }
    }

    Set<String> shadowedProvides = getShadowedProvides(provides);

    TypedScope topScope = compiler.getTopScope();

    processReservedSymbols(provides, topScope);

    for (String provide : provides) {
      TypedVar symbol = topScope.getOwnSlot(provide);
      String emitName = provide;
      String rewritenProvide = MODULE_PREFIX + provide.replace('.', '$');
      TypedVar moduleTypeVar = topScope.getOwnSlot(rewritenProvide);
      if (moduleTypeVar != null) {
        // The provide came from a goog.module.
        symbol = moduleTypeVar;
        emitName = rewritenProvide;
        rewrittenProvides.add(rewritenProvide);
      }
      if (needsAlias(shadowedProvides, provide, symbol)) {
        emitName += Constants.COLLDING_PROVIDE_ALIAS_POSTFIX;
      }
      if (symbol == null) {
        // Sometimes goog.provide statements are used as pure markers for dependency management, or
        // the defined provides do not get a symbol because they don't have a proper type.
        SourceFile file = provideToFile.get(provide);
        emitGeneratedFromFileComment(file);
        emitNamespaceBegin(getNamespace(emitName));
        emit("let");
        emit(getUnqualifiedName(emitName));
        emit(": any;");
        emitBreak();
        emitNamespaceEnd();
        declareModule(provide, true, emitName, file);
        continue;
      }
      if (symbol.getType() == null) {
        // A module that contains only typedefs will appear as null symbol. However, we can get the
        // corresponding type from the type registry.
        JSType moduleType = compiler.getTypeRegistry().getGlobalType(rewritenProvide);
        if (moduleType != null) {
          declareTypedefNamespace(symbol, moduleType, provides);
          declareModule(provide, /* isDefault */ true, rewritenProvide, symbol.getSourceFile());
        } else {
          emitComment("Skipping symbol " + symbol.getName() + " due to missing type information.");
        }
        continue;
      }
      // ArrayLike is defined in lib.d.ts, so we skip any type alias that
      // would shadow it.
      // Note that clutz expands type aliases used in closure code,
      // thus this does not result in undefined types.
      // This case handles goog.provided typedefs.
      if (isTypedef(symbol.getType()) && isArrayLike(symbol)) {
        emitSkipTypeAlias(symbol);
        emitBreak();
        continue;
      }
      String namespace = symbol.getName();
      boolean isDefault = isDefaultExport(symbol);
      // These goog.provide's have only one symbol, so users expect to use default import
      if (isDefault) {
        namespace = getNamespace(symbol.getName());
      }
      declareNamespace(namespace, symbol, emitName, isDefault, transitiveProvides, false);
      declareModule(provide, isDefault, emitName, symbol.getSourceFile());
    }
    // In order to typecheck in the presence of third-party externs, emit all extern symbols.
    processExternSymbols();

    // For the purposes of determining which provides have been emitted
    // combine original provides and rewritten ones.
    provides.addAll(rewrittenProvides);
    processUnprovidedTypes(provides, transitiveProvides);
    declareLegacyNamespaceAliases();

    checkState(indent == 0, "indent must be zero after printing, but is %s", indent);
    return out.toString();
  }

  /**
   * Skip emit & use for variables that will not be emitted due to {@link Options#skipEmitPattern}.
   */
  private boolean shouldSkipVar(TypedVar var) {
    return opts.skipEmitPattern != null
        && opts.skipEmitPattern.matcher(var.getInputName()).matches();
  }

  /** Skip emit & use for all symbols in files matching {@link Options#skipEmitPattern}. */
  private boolean shouldSkipSourceFile(SourceFile sourceFile) {
    String path = sourceFile.getOriginalPath();
    return opts.skipEmitPattern != null && opts.skipEmitPattern.matcher(path).matches();
  }

  /**
   * Special emit for emitting namespaces for typedefs as one-offs. Typedefs (type aliases in TS)
   * are special because their information does not come solely from a TypedVar object, but rather
   * from a pair of name (string) and type (JSType).
   *
   * <p>Note that this only handles default exports of typedefs. Typedefs as properties on an
   * already exported object (like class) are handled separately.
   */
  private void declareTypedefNamespace(TypedVar typedef, JSType typedefType, Set<String> provides) {
    String typedefName = typedef.getName();
    String namespace = getNamespace(typedefName);

    emitGeneratedFromFileComment(typedef.getSourceFile());
    // Ideally we should be using declareNamespace here, but it cannot handle gluing the TypedVar
    // symbol with the additional JSType typedefType.
    emitNamespaceBegin(namespace);

    new TreeWalker(compiler.getTypeRegistry(), provides, false, false)
        .visitTypeAlias(typedefType, typedefName, false);

    emitNamespaceEnd();
  }

  /**
   * Reserved words are problematic because they cannot be used as var declarations, but are valid
   * properties. For example:
   *
   * <pre>
   * var switch = 0;  // parses badly in JS.
   * foo.switch = 0;  // ok.
   * </pre>
   *
   * This means that closure code is allowed to goog.provide('ng.components.switch'), which cannot
   * trivially translate in TS to:
   *
   * <pre>
   * namespace ng.components {
   *   var switch : ...;
   * }
   * </pre>
   *
   * Instead, go one step higher and generate:
   *
   * <pre>
   * namespace ng {
   *   var components : {switch: ..., };
   * }
   * </pre>
   *
   * This turns a namespace into a property of its parent namespace. Note: this violates the
   * invariant that generated namespaces are 1-1 with getNamespace of goog.provides.
   */
  private void processReservedSymbols(TreeSet<String> provides, TypedScope topScope) {
    Set<String> collapsedNamespaces = new TreeSet<>();
    for (String reservedProvide : provides) {
      if (RESERVED_JS_WORDS.contains(getUnqualifiedName(reservedProvide))) {
        TypedVar var = topScope.getOwnSlot(reservedProvide);
        String namespace = getNamespace(reservedProvide);
        if (collapsedNamespaces.contains(namespace)) continue;
        collapsedNamespaces.add(namespace);
        Set<String> properties = getSubNamespace(provides, namespace);
        if (var != null) {
          emitGeneratedFromFileComment(var.getSourceFile());
        }
        emitNamespaceBegin(getNamespace(namespace));
        emit("let");
        emit(getUnqualifiedName(namespace));
        emit(": {");
        Iterator<String> bundledIt = properties.iterator();
        while (bundledIt.hasNext()) {
          emit(getUnqualifiedName(bundledIt.next()));
          emit(":");
          if (var != null) {
            TreeWalker walker = new TreeWalker(compiler.getTypeRegistry(), provides, false, false);
            walker.visitType(var.getType());
          } else {
            emit("any");
          }
          if (bundledIt.hasNext()) emit(",");
        }
        emit("};");
        emitBreak();
        emitNamespaceEnd();
        for (String property : properties) {
          // Assume that all symbols that are siblings of the reserved word are default exports.
          declareModule(property, true, property, true, var != null ? var.getSourceFile() : null);
        }
      }
    }
    // Remove the symbols that we have emitted above.
    Iterator<String> it = provides.iterator();
    while (it.hasNext()) {
      if (collapsedNamespaces.contains(getNamespace(it.next()))) it.remove();
    }
  }

  private Set<String> getSubNamespace(TreeSet<String> symbols, String namespace) {
    return symbols.subSet(namespace + ".", namespace + ".\uFFFF");
  }

  private Set<String> getShadowedProvides(TreeSet<String> provides) {
    Set<String> shadowedProvides = new TreeSet<>();
    for (String provide : provides) {
      if (!getSubNamespace(provides, provide).isEmpty()) {
        shadowedProvides.add(provide);
      }
    }
    return shadowedProvides;
  }

  private boolean isArrayLike(TypedVar symbol) {
    return symbol.getName().endsWith(".ArrayLike");
  }

  /**
   * Closure does not require all types to be explicitly provided, if they are only used in type
   * positions. However, our emit phases only emits goog.provided symbols and namespaces, so this
   * extra pass is required, in order to have valid output.
   */
  private void processUnprovidedTypes(Set<String> provides, Set<String> transitiveProvides) {
    /**
     * A new set of types can be discovered while visiting unprovided types. To prevent an infinite
     * loop in a pathological case, limit to a number of passes.
     *
     * <p>TODO(rado): investigate https://github.com/angular/clutz/pull/246 and removing this pass
     * altogether.
     */
    int maxTypeUsedDepth = 5;
    Set<String> typesEmitted = new LinkedHashSet<>();
    while (maxTypeUsedDepth > 0) {
      int typesUsedCount = typesUsed.size();
      // AFAICT, there is no api for going from type to symbol, so iterate all symbols first.
      for (TypedVar symbol : compiler.getTopScope().getAllSymbols()) {
        String name = symbol.getName();
        String namespace = getNamespace(name);
        // skip unused symbols, symbols already emitted or symbols whose namespace is emitted
        // (unless the symbols have their own provide).
        if (!typesUsed.contains(name)
            || typesEmitted.contains(name)
            || (!transitiveProvides.contains(name) && typesEmitted.contains(namespace))) {
          continue;
        }

        // skip provided symbols (as default or in an namespace).
        if (provides.contains(name)
            || (!transitiveProvides.contains(name) && provides.contains(namespace))) {
          continue;
        }
        // skip emit for provided inner symbols too as they are covered by the walkInnerSymbols
        // pass.
        if (isInnerSymbol(provides, name)) {
          continue;
        }

        // Skip extern symbols (they have a separate pass) and skip built-ins.
        // Built-ins can be indentified by having null as input file.
        CompilerInput symbolInput = this.compiler.getInput(new InputId(symbol.getInputName()));
        if (symbolInput == null || symbolInput.isExtern()) continue;

        if (shouldSkipVar(symbol)) {
          continue;
        }

        // A symbol with a name, but a null type is likely a typedef. DeclareNamespace cannot handle
        // this scenario, but declareTypedefNamespace
        if (symbol.getType() == null) {
          JSType typedef = compiler.getTypeRegistry().getGlobalType(name);
          if (typedef != null) {
            declareTypedefNamespace(symbol, typedef, Collections.emptySet());
            typesEmitted.add(name);
          }
          continue;
        }

        declareNamespace(
            namespace,
            symbol,
            name,
            /* isDefault */ true,
            Collections.<String>emptySet(),
            /* isExtern */ false);
        typesEmitted.add(name);
      }
      // if no new types seen, safely break out.
      if (typesUsed.size() == typesUsedCount) break;
      maxTypeUsedDepth--;
    }
  }

  /**
   * Returns whether this is an inner symbol of at least one of the given goog.provides.
   *
   * @param provides A collection of goog.provide symbols
   * @param name Fully qualified name of a symbol
   * @return Whether this is an inner symbol
   */
  private boolean isInnerSymbol(Collection<String> provides, String name) {
    for (String p : provides) {
      if (name.startsWith(p + '.')) {
        return true;
      }
    }
    return false;
  }

  /**
   * If any inputs declare a legacy namespace, emit aliases for their exports in goog.module style.
   */
  private void declareLegacyNamespaceAliases() {
    if (!legacyNamespaceReexportMap.isEmpty()) {
      for (Entry<String, String> e : legacyNamespaceReexportMap.entrySet()) {
        String namespace;
        String googModuleStyleName;
        if (e.getKey().contains(".")) {
          List<String> nameParts = DOT_SPLITTER.splitToList(e.getKey());
          namespace = nameParts.get(0);
          googModuleStyleName = nameParts.get(1);
        } else {
          namespace = "";
          googModuleStyleName = e.getKey();
        }
        TreeWalker treeWalker =
            new TreeWalker(compiler.getTypeRegistry(), new LinkedHashSet<>(), false, false);
        TypedVar symbol = compiler.getTopScope().getOwnSlot(e.getValue());
        if (symbol != null) {
          JSType type = symbol.getType();
          if (type != null && isDefiningType(type)) {
            emitGeneratedFromFileComment(symbol.getSourceFile());
            emitNamespaceBegin(namespace);
            treeWalker.visitTypeValueAlias(googModuleStyleName, type.toMaybeObjectType());
            emitNamespaceEnd();
          }
        }
      }
    }
  }

  private void processExternSymbols() {
    Set<String> visitedClassLikes = new TreeSet<>();

    List<TypedVar> externSymbols = new ArrayList<>();
    TreeSet<String> externSymbolNames = new TreeSet<>();
    final TreeSet<String> enumElementSymbols = new TreeSet<>();

    for (TypedVar symbol : compiler.getTopScope().getAllSymbols()) {
      CompilerInput symbolInput = compiler.getInput(new InputId(symbol.getInputName()));
      if (symbolInput == null || !symbolInput.isExtern() || symbol.getType() == null) {
        continue;
      }
      if (shouldAvoidGeneratingExterns(symbolInput.getName(), symbol.getName())) {
        continue;
      }
      JSType type = symbol.getType();
      // Closure treats all prototypes as separate symbols, but we handle them in conjunction with
      // parent symbol.
      if (symbol.getName().contains(".prototype")) continue;

      // Sub-parts of namespaces in externs can appear as unknown if they miss a @const.
      if (type.isUnknownType()) continue;

      if (type.isEnumType()) {
        EnumType eType = (EnumType) type;
        for (String element : eType.getElements()) {
          enumElementSymbols.add(symbol.getName() + "." + element);
        }
      }
      externSymbols.add(symbol);
      externSymbolNames.add(symbol.getName());
    }

    Iterator<TypedVar> it = externSymbols.iterator();

    while (it.hasNext()) {
      // Some extern symbols appear twice, once unprefixed, and once prefixed with window or this.
      // Skip the second one, if both exist.
      TypedVar symbol = it.next();
      String originalName = symbol.getName();
      String normalizedName = normalizeWindowGlobals(originalName);
      if (!normalizedName.equals(originalName) && externSymbolNames.contains(normalizedName)) {
        it.remove();
        externSymbolNames.remove(originalName);
      }
    }

    // Enum values like Enum.A will appear as stand-alone symbols, but we do not need to emit them.
    externSymbolNames.removeAll(enumElementSymbols);
    it = externSymbols.iterator();
    while (it.hasNext()) {
      if (enumElementSymbols.contains(it.next().getName())) {
        it.remove();
      }
    }

    sortSymbols(externSymbols);
    Set<String> shadowedSymbols = getShadowedProvides(externSymbolNames);
    for (TypedVar symbol : externSymbols) {
      String parentPath = getNamespace(symbol.getName());
      boolean isDefault = isDefaultExport(symbol);
      String emitName = symbol.getName();
      if (needsAlias(shadowedSymbols, symbol.getName(), symbol)) {
        emitName += Constants.COLLDING_PROVIDE_ALIAS_POSTFIX;
      }

      // There is nothing to emit for a namespace, because all its symbols will be visited later,
      // thus implicitly defining the namespace.
      if (isLikelyNamespace(symbol.getJSDocInfo())) continue;

      // Do not emit static fields as symbols, since they were already emitted in the class
      // definition.
      if (!isDefiningType(symbol.getType()) && visitedClassLikes.contains(parentPath)) continue;

      declareNamespace(
          isDefault ? parentPath : symbol.getName(),
          symbol,
          emitName,
          isDefault,
          shadowedSymbols,
          true);

      if (isDefault && isClassLike(symbol.getType())) visitedClassLikes.add(symbol.getName());
      // we do not declare modules or goog.require support, because externs types should not be
      // visible from TS code.
    }
  }

  private static final Ordering<TypedVar> BY_SOURCE_FILE =
      Ordering.natural()
          .onResultOf(
              input -> {
                if (input == null) return null;
                return input.getInputName();
              });

  private static final Ordering<TypedVar> BY_VAR_NAME =
      Ordering.natural()
          .onResultOf(
              input -> {
                if (input == null) return null;
                return input.getName();
              });

  private static final Ordering<TypedVar> BY_SOURCE_FILE_AND_VAR_NAME =
      BY_SOURCE_FILE.compound(BY_VAR_NAME);

  private void sortSymbols(List<TypedVar> symbols) {
    Collections.sort(symbols, BY_SOURCE_FILE_AND_VAR_NAME);
  }

  private boolean needsAlias(Set<String> shadowedSymbols, String provide, TypedVar symbol) {
    if (collidingProvides.contains(provide)) {
      return true;
    }
    if (!shadowedSymbols.contains(provide)) {
      return false;
    }
    // Emit var foo : any for provided but not declared symbols.
    if (symbol == null) {
      return true;
    }
    JSType type = symbol.getType();
    if (type == null) {
      return false;
    }

    // Emit var foo : PrivateType for private symbols.
    if (isPrivate(type.getJSDocInfo()) && !isConstructor(type.getJSDocInfo())) {
      return true;
    }
    // Only var declarations have collisions, while class, interface, function, and typedef can
    // coexist with namespaces.
    if (type.isInterface() || type.isConstructor() || type.isFunctionType() || isTypedef(type)) {
      return false;
    }
    return isDefaultExport(symbol);
  }

  private boolean isDefaultExport(TypedVar symbol) {
    if (symbol.getType() == null) return true;
    ObjectType otype = symbol.getType().toMaybeObjectType();
    if (otype != null && otype.getOwnPropertyNames().size() == 0) return true;
    return !symbol.getType().isObject()
        || symbol.getType().isInterface()
        || symbol.getType().isInstanceType()
        || symbol.getType().isEnumType()
        || symbol.getType().isFunctionType()
        || isTypedef(symbol.getType());
  }

  /**
   * We shouldn't generate for some symbols that are defined in lib.d.ts. This returns true if the
   * given symbol is one that we should not emit.
   */
  private boolean shouldAvoidGeneratingExterns(String filePath, String symbolName) {
    // This file is built in to Clutz for testing, so special-case it here.
    String fileName = new File(filePath).getName();
    if (fileName.equals("es6_min.js")) return true;

    // If asked about a symbol like "window.Array", perform the below lookups on just
    // "Array".
    symbolName = normalizeWindowGlobals(symbolName);

    // We're asked about e.g. "Array.from", which we should treat as a platform extern.
    // The PlatformSymbols lists just contain the toplevel name like "Array", so strip after
    // the first dot.
    int dotPos = symbolName.indexOf('.');
    if (dotPos > 0) {
      symbolName = symbolName.substring(0, dotPos);
    }

    // Don't emit externs for Closure types that nobody uses.
    if (PlatformSymbols.CLOSURE_EXTERNS_NOT_USED_IN_TYPESCRIPT.contains(symbolName)) return true;
    if (PlatformSymbols.ADDITIONAL_CLOSURE_EXTERNS_NOT_USED_IN_TYPESCRIPT.contains(symbolName))
      return true;
    // Don't emit externs for Closure types that have TypeScript equivalents.
    if (PlatformSymbols.CLOSURE_TO_TYPESCRIPT.containsKey(symbolName)) return true;
    // Don't emit externs for Closure types that exist in TypeScript already.
    if (PlatformSymbols.TYPESCRIPT_LIB_D_TS.contains(symbolName)) return true;

    return false;
  }

  /**
   * Strip window. or this. from full symbol names. Technically, window. and this. symbols are
   * tracked separately in the type system from the global symbols, but they largely overlap both in
   * TS and Closure.
   */
  private String normalizeWindowGlobals(String name) {
    return name.replaceAll("^(window|this)\\.", "");
  }

  private void declareNamespace(
      String namespace,
      TypedVar symbol,
      String emitName,
      boolean isDefault,
      Set<String> provides,
      boolean isExtern) {

    if (!isValidJSProperty(getUnqualifiedName(symbol))) {
      emit("// skipping property " + symbol.getName() + " because it is not a valid symbol.");
      emitBreak();
      return;
    }
    emitGeneratedFromFileComment(symbol.getSourceFile());
    boolean isGoogNamespace =
        GOOG_BASE_NAMESPACE.equals(namespace) && GOOG_BASE_NAMESPACE.equals(symbol.getName());
    if (isGoogNamespace) {
      // Emitting the 'goog' namespace itself (but not e.g. 'goog.Uri').
      emitTopLevelNamespaceBegin(namespace);
    } else {
      emitNamespaceBegin(namespace);
    }
    TreeWalker treeWalker =
        new TreeWalker(compiler.getTypeRegistry(), provides, isExtern, isGoogNamespace);

    // See maybeQueueForInnerWalk comment.
    Map<String, ObjectType> symbolsToInnerWalk = new TreeMap<>();

    if (isDefault) {
      if (isPrivate(symbol.getJSDocInfo()) && !isConstructor(symbol.getJSDocInfo())) {
        treeWalker.emitPrivateValue(emitName);
      } else {
        treeWalker.walk(symbol, emitName);
        maybeQueueForInnerWalk(isExtern, symbolsToInnerWalk, symbol, emitName);
      }
    } else {
      // JSCompiler treats "foo.x" as one variable name, so collect all provides that start with
      // $provide + "." but are not sub-properties.
      Set<String> desiredSymbols = new TreeSet<>();
      List<TypedVar> allSymbols = Lists.newArrayList(compiler.getTopScope().getAllSymbols());
      sortSymbols(allSymbols);

      ObjectType objType = symbol.getType().toMaybeObjectType();
      // Can be null if the symbol is provided, but not defined.
      Set<String> propertyNames =
          objType != null ? objType.getOwnPropertyNames() : Collections.<String>emptySet();
      for (String property : propertyNames) {
        // When parsing externs, namespaces are explicitly declared with a var of Object type
        // Do not emit the var declaration, as it will conflict with the namespace.
        if (isExtern && isLikelyNamespace(objType.getOwnPropertyJSDocInfo(property))) {
          continue;
        }
        if (!isEmittableProperty(objType, property)) {
          continue; // skip private properties.
        }
        if (!isValidJSProperty(property)) {
          continue; // skip properties whose name is not a valid JS/TS identifier.
        }
        desiredSymbols.add(symbol.getName() + "." + property);
      }
      // Any provides have their own namespace and should not be emitted in this namespace.
      for (String provide : provides) {
        String toRemove = provide;
        while (!toRemove.isEmpty()) {
          desiredSymbols.remove(toRemove);
          // Also remove their implicit parent namespaces
          toRemove = toRemove.substring(0, Math.max(0, toRemove.lastIndexOf('.')));
        }
      }

      for (TypedVar propertySymbol : allSymbols) {
        String propertyName = propertySymbol.getName();
        if (desiredSymbols.contains(propertyName)
            && propertySymbol.getType() != null
            && !propertySymbol.getType().isFunctionPrototypeType()
            && !isPrototypeMethod(propertySymbol)) {
          if (!isValidJSProperty(getUnqualifiedName(propertySymbol))) {
            emit(
                "// skipping property '"
                    + getUnqualifiedName(propertyName)
                    + "' because it is not a valid symbol.");
            emitBreak();
            continue;
          }
          // For safety we need to special case goog.require to return the empty interface by
          // default. For existing namespaces we emit a goog.require string override that has the
          // proper type. See emitGoogRequireSupport method.
          if (propertyName.equals("goog.require")) {
            emit(
                "function require (name : string ) : "
                    + Constants.INTERNAL_NAMESPACE
                    + ".ClosureSymbolNotGoogProvided;");
            desiredSymbols.remove(propertyName);
            emitBreak();
            continue;
          }
          try {
            treeWalker.walk(propertySymbol, propertyName);
            maybeQueueForInnerWalk(isExtern, symbolsToInnerWalk, propertySymbol, propertyName);
          } catch (RuntimeException e) {
            // Do not throw DeclarationGeneratorException - this is an unexpected runtime error.
            throw new RuntimeException("Failed to emit for " + propertySymbol, e);
          }
          desiredSymbols.remove(propertyName);
        }
      }

      ObjectType oType = symbol.getType().toMaybeObjectType();

      if (oType != null) {
        // For inferred symbols there is no matching symbol, so the best we can do is pull the
        // type from the module object type map.
        for (String desiredSymbol : desiredSymbols) {
          List<String> parts = DOT_SPLITTER.splitToList(desiredSymbol);
          String propName = parts.get(parts.size() - 1);
          if (!isValidJSProperty(propName)) {
            emitComment("skipping property " + propName + " because it is not a valid symbol.");
            continue;
          }
          if (aliasMap.containsKey(desiredSymbol)) {
            visitKnownTypeValueAlias(propName, aliasMap.get(desiredSymbol));
            continue;
          }
          JSType propType = oType.getPropertyType(propName);
          // TreeWalker.visitProperty doesn't handle class types, so handle them separately
          if (isClassLike(propType)) {
            treeWalker.visitClassOrInterface(propName, propType.toMaybeFunctionType());
            continue;
          }

          if (propType.toMaybeFunctionType() == null) {
            emit("let");
          } else {
            emit("function");
          }
          boolean forcePropDeclaration = false;
          boolean isStatic = forcePropDeclaration;
          boolean isNamespace = true;
          treeWalker.visitProperty(
              propName,
              oType,
              isStatic,
              forcePropDeclaration,
              isNamespace,
              Collections.<String>emptyList());
        }
      }
    }
    emitNamespaceEnd();

    for (Map.Entry<String, ObjectType> entry : symbolsToInnerWalk.entrySet()) {
      treeWalker.walkInnerSymbols(entry.getValue(), entry.getKey());
    }
  }

  /**
   * Extra walk is required for inner classes and inner enums. They are allowed in closure, but not
   * in TS, so we have to generate a namespace-class pair in TS. In the case of the externs, however
   * we *do* go through all symbols so this pass is not needed. In the case of aliased classes, we
   * cannot emit inner classes, due to a var-namespace clash.
   */
  private void maybeQueueForInnerWalk(
      boolean isExtern,
      Map<String, ObjectType> symbolsToInnerWalk,
      TypedVar propertySymbol,
      String propertyName) {
    ObjectType oType = propertySymbol.getType().toMaybeObjectType();
    if (!isExtern && oType != null && !isAliasedClassOrInterface(propertySymbol, oType)) {
      symbolsToInnerWalk.put(propertyName, oType);
    }
  }

  /**
   * Special emit for known aliases See KNOWN_ALIASES comment why this workaround is need.
   *
   * <p>This shares some similarity with visitTypeValueAlias method above, but it has to hardcode
   * one assumptions - the alias is for a class with no generics.
   */
  private void visitKnownTypeValueAlias(String unqualifiedName, String alternativeAliasName) {
    String emitName = Constants.INTERNAL_NAMESPACE + "." + alternativeAliasName;
    emit("export import");
    emit(unqualifiedName);
    emit("=");
    emit(emitName);
    emit(";");
    emitBreak();
    typesUsed.add(alternativeAliasName);
  }

  // Ignoring Unicode symbols for now.
  // see: http://stackoverflow.com/questions/2008279/validate-a-javascript-function-name
  private static final Pattern JS_IDENTIFIER = Pattern.compile("^[$a-zA-Z_][0-9a-zA-Z_$]*$");
  private static final Pattern NON_JS_IDENT_CHAR = Pattern.compile("[^0-9a-zA-Z_$]");

  private boolean isValidJSProperty(String name) {
    return JS_IDENTIFIER.matcher(name).matches();
  }

  private String escapeForJSProperty(String name) {
    return NON_JS_IDENT_CHAR.matcher(name).replaceAll("_");
  }

  /**
   * Returns whether the author tried to express the concept of a namespace in Closure. TS has a
   * first-class keyword for it, but in Closure we need to infer it from the JSDoc. Roughly, a
   * namespace is a static object used for hierarchically organizing values.
   *
   * <p>TODO(rado): this might still have some false positives. A more robust check would also
   * verify that there are child properties (an empty namespace is not useful).
   */
  private boolean isLikelyNamespace(JSDocInfo doc) {
    if (doc == null) return false;
    // Authors should prefer @const to express a namespace in externs, and just goog.provide it
    // in non-extern code. However, there are still usages of @type {Object}.
    JSTypeExpression type = doc.getType();
    if (type != null && type.getRoot().isString() && type.getRoot().getString().equals("Object")) {
      return true;
    }
    return doc.hasConstAnnotation() && !doc.hasType();
  }

  /**
   * Returns true if {@code propType} is creating a new type in the TypeScript sense - i.e. it's a
   * constructor function (class or interface), enum, or typedef.
   */
  private boolean isDefiningType(JSType propType) {
    return isClassLike(propType)
        || propType.isEnumType()
        || propType.isInterface()
        || isTypedef(propType);
  }

  /**
   * Returns true for types that are class like, i.e. that define a constructor or interface, but
   * excludes typedefs and the built-in constructor functions such as {@code Function}.
   */
  private boolean isClassLike(JSType propType) {
    // Confusingly, the typedef type returns true on isConstructor checks, so we need to filter
    // the NoType through this utility method.
    return !isTypedef(propType)
        && (propType.isConstructor() || propType.isInterface())
        // "Function" is a constructor, but does not define a new type for our purposes.
        && !propType.toMaybeObjectType().isNativeObjectType()
        && !propType.isFunctionPrototypeType();
  }

  // This indirection exists because the name in the Closure APIs is confusing.
  // TODO(rado): figure out if NoType can be created through other means and more filtering is
  // needed here.
  private boolean isTypedef(JSType type) {
    return type.isNoType();
  }

  private void emitNamespaceBegin(String namespace) {
    String internalNamespace = Constants.INTERNAL_NAMESPACE;
    if (!namespace.isEmpty()) {
      internalNamespace += ".";
      internalNamespace += namespace;
    }
    emitTopLevelNamespaceBegin(internalNamespace);
  }

  private void emitTopLevelNamespaceBegin(String namespace) {
    List<String> prefix = new ArrayList<>();
    // Closure Compiler accepts namespaces containing keywords, e.g. foo.delete.bar.
    // TypeScript rejects "namespace foo.delete.bar".
    // To fix, we emit "foo.delete_.bar", and then re-export the keywords:
    //     namespace foo { export { delete_ as delete }; }
    // Order does not matter, so emitting the re-export before the declaration is fine.
    for (String token : DOT_SPLITTER.split(namespace)) {
      if (RESERVED_JS_WORDS.contains(token)) {
        emitNoSpace("declare namespace ");
        emitNoSpace(Joiner.on(".").join(prefix));
        emitNoSpace(" {");
        indent();
        emitBreak();
        emit("export {" + token + "_ as " + token + "};");
        emitBreak();
        unindent();
        emitNoSpace("}");
        emitBreak();
      }
      prefix.add(token);
    }
    String fixed = escapeKeywordsInNamespace(namespace);
    emitNoSpace("declare namespace ");
    emitNoSpace(fixed);
    emitNoSpace(" {");
    indent();
    emitBreak();
  }

  /** Escapes reserved words in a namespace by appending underscores. */
  String escapeKeywordsInNamespace(String namespace) {
    return DOT_SPLITTER
        .splitToStream(namespace)
        .map(t -> RESERVED_JS_WORDS.contains(t) ? t + "_" : t)
        .collect(Collectors.joining("."));
  }

  private void emitNamespaceEnd() {
    unindent();
    emit("}");
    emitBreak();
  }

  private boolean isPrototypeMethod(TypedVar other) {
    if (other.getType() != null && other.getType().isOrdinaryFunction()) {
      JSType typeOfThis = ((FunctionType) other.getType()).getTypeOfThis();
      if (typeOfThis != null && !typeOfThis.isUnknownType()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if the given property on the given object should be emitted. That is, it is
   * visible or a constructor.
   */
  private boolean isEmittableProperty(ObjectType obj, String propName) {
    JSDocInfo info = obj.getOwnPropertyJSDocInfo(propName);
    // Skip emitting private properties, but do emit constructors because they introduce a
    // type that can be used in type contexts.
    return !isPrivate(info) || isConstructor(info);
  }

  private boolean isTypeCheckSuppressedProperty(ObjectType obj, String propName) {
    JSDocInfo info = obj.getOwnPropertyJSDocInfo(propName);
    return info != null && info.getSuppressions().contains("checkTypes");
  }

  private boolean isPrivate(JSType type) {
    // Due to https://github.com/google/closure-compiler/issues/1975 we cannot obtain the JSDoc
    // for a typedef. Assume non-private as it is more common.
    // Closure creates a NamedType when the typedef is used in an union, eg: T | null.
    // Dereference the named type before checking if it is a typedef.
    NamedType nType = type.toMaybeNamedType();
    if (typedefs.containsKey(type)
        || (nType != null && typedefs.containsKey(nType.getReferencedType()))) {
      return false;
    }

    // For unknown reasons, enum types do not keep their defining jsdoc info.
    if (type.isEnumType() || type.isEnumElementType()) {
      return isPrivate(type.getDisplayName());
    } else {
      return isPrivate(type.getJSDocInfo());
    }
  }

  private boolean isPrivate(String name) {
    TypedVar var = compiler.getTopScope().getOwnSlot(name);
    if (var == null) return false;
    return isPrivate(var.getJSDocInfo());
  }

  private boolean isPrivate(@Nullable JSDocInfo docInfo) {
    if (docInfo == null) {
      return false;
    }
    // Closure Compiler has @package visibility, which makes symbols accessible to code in the same
    // package. ES6 modules do not have this concept at all, as there are no packages to begin with.
    // As TypeScript code can never be in the same package as JavaScript code, because TS code is in
    // no package at all, Clutz considers @package visible fields to be private.
    return docInfo.getVisibility() == Visibility.PRIVATE
        || docInfo.getVisibility() == Visibility.PACKAGE;
  }

  private boolean isConstructor(@Nullable JSDocInfo docInfo) {
    return docInfo != null && docInfo.isConstructor();
  }

  private void declareModule(
      String name, boolean isDefault, String emitName, StaticSourceFile sourceFile) {
    declareModule(name, isDefault, emitName, /* inParentNamespace= */ false, sourceFile);
  }

  private void declareModule(
      String name,
      boolean isDefault,
      String emitName,
      boolean inParentNamespace,
      StaticSourceFile sourceFile) {
    if (GOOG_BASE_NAMESPACE.equals(name)) {
      // goog:goog cannot be imported.
      return;
    }
    emitGeneratedFromFileComment(sourceFile);
    emitNoSpace("declare module '");
    emitNoSpace("goog:" + name);
    emitNoSpace("' {");
    indent();
    emitBreak();
    // Use the proper name as the alias name, so the TypeScript language service
    // can offer it as an auto-import (auto-imports are offered for the exported
    // name).
    String alias = getUnqualifiedName(name);

    // Make sure we don't emit a variable named after a keyword.
    if (RESERVED_JS_WORDS.contains(alias)) alias += "_";

    // workaround for https://github.com/Microsoft/TypeScript/issues/4325
    emit("import " + alias + " = ");
    emitNoSpace(Constants.INTERNAL_NAMESPACE);
    emitNoSpace(".");
    String emitNamespace = inParentNamespace ? getNamespace(emitName) : emitName;
    emitNoSpace(escapeKeywordsInNamespace(emitNamespace));
    emitNoSpace(";");
    emitBreak();
    if (isDefault) {
      emitNoSpace("export default " + alias);
      if (inParentNamespace) emitNoSpace("." + getUnqualifiedName(name));
      emitNoSpace(";");
    } else {
      emitNoSpace("export = " + alias + ";");
    }
    emitBreak();
    unindent();
    emit("}");
    emitBreak();
  }

  static List<SourceFile> getDefaultExterns(Options opts) {
    try {
      return AbstractCommandLineRunner.getBuiltinExterns(
          opts.getCompilerOptions().getEnvironment());
    } catch (IOException e) {
      throw new RuntimeException("Could not locate builtin externs", e);
    }
  }

  private int indent = 0;
  private boolean startOfLine = true;

  private void indent() {
    indent++;
  }

  private void unindent() {
    indent--;
    checkState(indent >= 0, "indentation level below zero");
  }

  private void emitNoSpace(String str) {
    maybeEmitIndent();
    out.write(str);
  }

  private void emit(String str) {
    checkNotNull(str);
    if (!maybeEmitIndent()) {
      out.write(" ");
    }
    out.write(str);
  }

  private boolean maybeEmitIndent() {
    if (!startOfLine) {
      return false;
    }
    for (int i = 0; i < indent; i++) {
      out.write("  ");
    }
    startOfLine = false;
    return true;
  }

  private void emitBreak() {
    out.write("\n");
    startOfLine = true;
  }

  /**
   * This function should called before every top-level `declare module` or `declare namespace`
   * call. It is used by developers to better understand where symbols are coming from and also by
   * tools (e.g. http://kythe.io for JS <=> TS integration).
   *
   * @param file Original .js file that contained JS symbol for which module/namespace is being
   *     generated.
   */
  private void emitGeneratedFromFileComment(StaticSourceFile file) {
    emit("// Generated from");
    String fileName = file == null ? "unknown file" : file.getName();
    emit(stripLineTerminators(fileName));
    emitBreak();
  }

  private void emitComment(String s) {
    emit("//!!"); // these comments are stripped in unit tests
    emit(stripLineTerminators(s));
    emitBreak();
  }

  private static final CharMatcher LINE_TERMINATORS = CharMatcher.anyOf("\n\r\u2028\u2029");

  /**
   * Strips line terminators from the given string, so that they can be safely emitted in a single
   * line comment.
   */
  private String stripLineTerminators(String s) {
    return LINE_TERMINATORS.replaceFrom(s, '_');
  }

  private ObjectType getSuperType(FunctionType type) {
    ObjectType proto = type.getPrototype();
    if (proto == null) return null;
    ObjectType implicitProto = proto.getImplicitPrototype();
    if (implicitProto == null) return null;
    return "Object".equals(implicitProto.getDisplayName()) ? null : implicitProto;
  }

  private String getUnqualifiedName(TypedVar symbol) {
    return getUnqualifiedName(symbol.getName());
  }

  private String getUnqualifiedName(String name) {
    return lastDottedPart(name);
  }

  private String lastDottedPart(String input) {
    int dotIdx = input.lastIndexOf('.');
    if (dotIdx == -1) {
      return input;
    }
    return input.substring(dotIdx + 1, input.length());
  }

  private class TreeWalker {
    private final JSTypeRegistry typeRegistry;
    private final Set<String> provides;
    /** Whether the symbol we are walking was defined in an extern file */
    private final boolean isExtern;

    /**
     * Every clutz produced namespace is under the ಠ_ಠ.clutz except for goog, which is special cased
     * to allow users to use eg goog.require() without an import. Because it isn't under the
     * ಠ_ಠ.clutz namespace, symbols from outside goog (ie types in closure.lib.d.ts) have to be
     * special cased.
     */
    private final boolean isGoogNamespace;

    private TreeWalker(
        JSTypeRegistry typeRegistry,
        Set<String> provides,
        boolean isExtern,
        boolean isGoogNamespace) {
      this.typeRegistry = typeRegistry;
      this.provides = provides;
      this.isExtern = isExtern;
      this.isGoogNamespace = isGoogNamespace;
    }

    private String getAbsoluteName(ObjectType objectType) {
      String name = objectType.getDisplayName();
      // Names that do not have a namespace '.' are either platform names in the top level
      // namespace like `Object` or `Element`, or they are unqualified `goog.provide`s, e.g.
      // `goog.provide('Toplevel')`. In both cases they will be found with the naked name.
      // However a goog.provide'd name can collide with a re-declared top-level symbol, e.g. if some
      // code goog.provide's `Element`.
      // TODO(martinprobst): Consider aliasing all global symbols into the clutz namespace.
      if (name.indexOf('.') == -1) return name;
      if (this.isGoogNamespace && name.startsWith("goog.")) return name;
      return Constants.INTERNAL_NAMESPACE + "." + name;
    }

    private void walk(TypedVar symbol, String emitName) {
      JSType type = symbol.getType();
      if (type.isFunctionType() && !isNewableFunctionType(type.toMaybeFunctionType())) {
        FunctionType ftype = (FunctionType) type;

        if (isOrdinaryFunction(ftype)) {
          maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ false);
          visitFunctionExpression(getUnqualifiedName(symbol), ftype);
          return;
        }

        maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ true);

        // The class/interface symbol might be an alias for another symbol.
        // Since closure inlines all aliases before this step, check against
        // the type name.
        if (!isAliasedClassOrInterface(symbol, ftype)) {
          visitClassOrInterface(getUnqualifiedName(symbol), ftype);
        } else {
          if (KNOWN_CLASS_ALIASES.containsKey(symbol.getName())) {
            visitKnownTypeValueAlias(
                getUnqualifiedName(symbol), KNOWN_CLASS_ALIASES.get(symbol.getName()));
          } else {
            visitTypeValueAlias(getUnqualifiedName(symbol), ftype);
          }
        }
      } else {
        maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ false);
        if (type.isEnumType()) {
          visitEnumType(emitName, emitName, (EnumType) type, symbol.getNode());
          return;
        }
        if (isTypedef(type)) {
          // ArrayLike is defined in lib.d.ts, so we skip any type alias that
          // would shadow it.
          // Note that clutz expands type aliases used in closure code,
          // thus this does not result in undefined types.
          // This case handles not goog.provided typedefs.
          if (isArrayLike(symbol)) {
            emitSkipTypeAlias(symbol);
            emitBreak();
            return;
          }
          // The aliased type is present in the registry under the symbol name.
          JSType registryType = typeRegistry.getGlobalType(symbol.getName());
          if (registryType != null) {
            visitTypeAlias(registryType, symbol);
            return;
          } else {
            emitComment(
                "Intended to visit type alias '"
                    + symbol.getName()
                    + " but type not found in Closure type registry.");
          }
        }
        // The enum alias of an unknown type is present in the type registry, but its type is still
        // listed as unknown type instead of enum type.
        JSType registryType = typeRegistry.getGlobalType(symbol.getName());
        if (type.isUnknownType() && registryType != null && registryType.isEnumElementType()) {
          visitTypeValueAlias(getUnqualifiedName(symbol), (EnumElementType) registryType);
          return;
        }
        // Clutz doesn't have good type info - check if the symbol is a reexport by checking
        // aliasMap
        // otherwise assume it's a var declaration
        if (aliasMap.containsKey(emitName)) {
          visitKnownTypeValueAlias(getUnqualifiedName(symbol), aliasMap.get(emitName));
        } else {
          visitVarDeclaration(getUnqualifiedName(emitName), type);
        }
      }
    }

    /**
     * Used to differentiate a function with a constructor function type, from ordinary ones.
     * <pre>
     * @type {function(new:X)} foo.x;
     * </pre>
     * isNominalConstructor cannot be used because it returns
     * true for all classes/interfaces that have = function() {} (even if they are structural
     * interfaces!).
     *
     * <p>That means valid interfaces are considered non-nominal, like
     * <pre>
     * var I; (in externs) // or ns.I = goog.nullFunction();
     * </pre>
     */
    private boolean isNewableFunctionType(FunctionType type) {
      // Not sure why, but null display name is a good differentiator of newable functions.
      return type.isConstructor() && type.getDisplayName() == null;
    }

    /**
     * In closure almost any object can be aliased by 'const Something = Other', where other can be
     * value, type or value-type object. For types (interfaces) and value-type (classes, enums)
     * TypeScript does not have an easy one-liner syntax. Instead we have to expand into the form:
     *
     * <p>type KlassAlias = Klass; const KlassAlias = typeof Klass;
     *
     * <p>With incremental clutz it is possible that the type is not present. In such cases one
     * needs to pass 'null' and an explicit non-null alternativeAliasName will be used.
     */
    private void visitTypeValueAlias(String unqualifiedName, ObjectType otype) {
      String emitName =  otype.getDisplayName() == null ? "any" : Constants.INTERNAL_NAMESPACE + "." + otype.getDisplayName();
      emit("export import");
      emit(unqualifiedName);
      emit("=");
      emit(emitName);
      emit(";");
      emitBreak();
      typesUsed.add(otype.getDisplayName());
    }

    private void maybeEmitJsDoc(JSDocInfo docs, boolean ignoreParams) {
      if (docs == null) {
        return;
      }
      String desc = docs.getBlockDescription();
      if (desc == null) {
        return;
      }
      emit("/**");
      emitBreak();
      for (String line : Splitter.on('\n').split(desc)) {
        emit(" *");
        if (!line.isEmpty()) emit(line);
        emitBreak();
      }
      if (!ignoreParams) {
        for (String name : docs.getParameterNames()) {
          if (docs.getDescriptionForParameter(name) == null) continue;
          emit(" * @param");
          emit(name);
          emit(docs.getDescriptionForParameter(name));
          emitBreak();
        }
      }
      emit(" */");
      emitBreak();
    }

    private void visitClassOrInterface(String name, FunctionType ftype) {
      Set<String> staticProps = getTypePropertyNamesToEmit(ftype, true);
      if (!staticProps.isEmpty() && ftype.isInterface()) {
        // This is an interface, but in Closure, interfaces can still have static properties
        // defined on them. Emit those in a namespace that matches the interface's name.
        emit("namespace");
        emit(name);
        emit("{");
        indent();
        emitBreak();
        visitStaticProperties(ftype, staticProps, /* isInNamespace*/ true);
        unindent();
        emit("}");
        emitBreak();
      }
      if (ftype.isConstructor()) {
        if (ftype.isAbstract()) {
          emit("abstract");
        }
        // "proper" class constructor
        emit("class");
      } else if (ftype.isInterface()) {
        emit("interface");
      } else {
        checkState(false, "Unexpected function type " + ftype);
      }
      emit(name);

      visitTemplateTypes(ftype);

      // Interface extends another interface
      if (ftype.getExtendedInterfacesCount() > 0) {
        emit("extends");
        Iterator<ObjectType> it = ftype.getExtendedInterfaces().iterator();
        emitCommaSeparatedInterfaces(it);
      }
      // Class extends another class
      ObjectType superType = getSuperType(ftype);
      if (superType != null) {
        emit("extends");
        Visitor<Void> visitor = new ExtendsImplementsTypeVisitor();
        superType.visit(visitor);
      }

      Iterator<ObjectType> it = ftype.getOwnImplementedInterfaces().iterator();
      if (it.hasNext()) {
        emit("implements");
        emitCommaSeparatedInterfaces(it);
      }

      visitObjectType(ftype, ftype.getPrototype(), getTemplateTypeNames(ftype));
    }

    private void emitCommaSeparatedInterfaces(Iterator<ObjectType> it) {
      while (it.hasNext()) {
        ObjectType type = it.next();
        if (isPrivate(type.getJSDocInfo()) && !isConstructor(type.getJSDocInfo())) {
          // TypeScript does not allow public APIs that expose non-exported/private types.
          emit(getGlobalSymbolNamespacePrefix() + "PrivateInterface");
        } else {
          ExtendsImplementsTypeVisitor visitor = new ExtendsImplementsTypeVisitor();
          type.visit(visitor);
        }
        if (it.hasNext()) {
          emit(",");
        }
      }
    }

    private void visitVarDeclaration(String name, JSType type) {
      emit("let");
      emit(name);
      visitTypeDeclaration(type, false, false);
      emit(";");
      emitBreak();
    }

    private void visitTemplateTypes(ObjectType type) {
      visitTemplateTypes(type, Collections.<String>emptyList(), true);
    }

    /**
     * Emits template types for a given type. For example for <code>T<A,B></code>, this method will
     * emit <code><A,B></code>.
     *
     * @param type the type in question
     * @param alreadyEmittedTemplateType when visiting methods the class template types will be
     *     reported by closure, but should not be emitted.
     * @param isDeclaration isDeclaration {@pre true} if this type declares the template types,
     *     {@pre false} if it instantiates a generic type. In the former case, Clutz emits defaults
     *     for the template parameters.
     */
    private void visitTemplateTypes(
        ObjectType type, List<String> alreadyEmittedTemplateType, boolean isDeclaration) {
      if (type.hasAnyTemplateTypes() && !type.getTemplateTypeMap().isEmpty()) {
        List<String> realTemplateType = new ArrayList<>();

        for (TemplateType templateType : type.getTemplateTypeMap().getTemplateKeys()) {
          String displayName = templateType.getDisplayName();

          // Some template variables can be already defined at the class definition.
          // Closure and TypeScript disagree in that case, in closure redeclaring a class template
          // variable at a method does nothing, but in Typescript it introduces a new variable.
          // To preserve the semantics from closure we skip emitting redeclared variables.
          if (alreadyEmittedTemplateType.contains(displayName)) {
            continue;
          }

          if (displayName.contains("IObject#")) {
            displayName = normalizeIObjectTemplateName(type, displayName);
          }
          // When we emit partial programs, we cannot differentiate whether Foo
          // is a plain type or a generic type for which closure infers '?' as
          // all type arguments.
          // To support this usecase we emit ' = any' for all generic args.
          if (opts.partialInput && isDeclaration) {
            displayName += " = any";
          }

          if (displayName != null) {
            realTemplateType.add(displayName);
          }
        }

        if (!realTemplateType.isEmpty()) {
          emit("<");
          emit(Joiner.on(" , ").join(realTemplateType));
          emit(">");
        }
      }
    }

    private String normalizeIObjectTemplateName(ObjectType type, String displayName) {
      // IObject itself needs too keep the template names, as it is a trully parametric type.
      if (type.getDisplayName().equals("IObject")) {
        return displayName.substring(displayName.indexOf('#') + 1);
      }
      // For other types, we use index signatures in TS to express the same concept, so skip
      // emitting.
      return null;
    }

    private void visitTypeAlias(JSType registryType, TypedVar symbol) {
      visitTypeAlias(registryType, getUnqualifiedName(symbol), false);
    }

    private void visitTypeAlias(
        JSType registryType, String unqualifiedName, boolean emitNeverBrand) {
      emitTypeAliasPrefix(registryType, unqualifiedName);
      // emit a brand to prevent accidental compatibility of values with an enum.
      if (emitNeverBrand) emit("&{clutzEnumBrand: never}");
      emit(";");
      emitBreak();
    }

    private void visitTypeAliasForMixedStringEnums(
        JSType registryType, String unqualifiedName, Set<String> literalTypes) {
      emitTypeAliasPrefix(registryType, unqualifiedName);
      emit("&{clutzEnumBrand: never}");
      // Inline all literal types in the type alias.
      for (String n : literalTypes) {
        emit("|'" + n + "'");
      }
      emit(";");
      emitBreak();
    }

    private void emitTypeAliasPrefix(JSType registryType, String unqualifiedName) {
      emit("type");
      emit(unqualifiedName);
      emit("=");
      visitType(registryType, true, false);
    }

    private void visitEnumType(String symbolName, String qualifiedName, EnumType type, Node node) {
      // Enums are top level vars, but also declare a corresponding type:
      // <pre>
      // /** @enum {ValueType} */ var MyEnum = {A: ..., B: ...};
      // type MyEnum = EnumValueType;
      // var MyEnum: {A: MyEnum, B: MyEnum, ...};
      // </pre>
      // We special case "number" enums and "string" enums.

      // TS `type` declarations accept only unqualified names.
      String unqualifiedName = getUnqualifiedName(symbolName);

      // @enums can be aliased by assignment. Emit a type alias + value alias for the situation.
      String elementsTypeName = type.getElementsType().getReferenceName();
      if (qualifiedName.equals(elementsTypeName)) {
        // @enums can also be aliased to external values even if they have the same type.
        if (node != null && node.getNext() != null && node.getNext().isGetProp()) {
          elementsTypeName = node.getNext().getQualifiedName();
        }
      }

      if (!qualifiedName.equals(elementsTypeName)) {
        emitComment(symbolName + " aliases enum " + elementsTypeName);
        emit("export import");
        emit(unqualifiedName);
        emit("=");
        emit(elementsTypeName);
        emit(";");
        emitBreak();
        return;
      }

      // The current node points to either:
      // 1) The GETPROP node for a goog.provide style export - a.b.MyEnum = {...};
      // 2) The STRINGLIT node for a goog.module style export - exports = { MyEnum: {...}, ...}
      // For case 1) we need to get the next node, while for 2) we need to get the first child.
      Node objectOfAllMembers = node.getParent().isAssign() ? node.getNext() : node.getFirstChild();

      Map<String, Node> elements = new LinkedHashMap<>();
      for (Node element : objectOfAllMembers.children()) {
        elements.put(element.getString(), element.getFirstChild());
      }

      JSType primitiveType = type.getEnumeratedTypeOfEnumObject();
      if (maybeStringOrNumericEnum(type, unqualifiedName, objectOfAllMembers, elements)) {
        return;
      }

      // We checked the types of all members in the enums above. Since it's not all string literals
      // or numbers, we cannot emit a TypeScript enum. Instead, we emit it as a var/type alias pair.
      // Specially for string enums, we still try to emit as many literal types as possible to make
      // it close to the original intent from Closure. To do that we also inline all literal types
      // in the type alias so this type alias can be compared and assigned by the literal types
      // (because the literal types don't have clutzEnumBrand).
      if (primitiveType.equals(stringType)) {
        Set<String> literalTypes = collectAllLiterals(elements);
        visitTypeAliasForMixedStringEnums(primitiveType, unqualifiedName, literalTypes);
      } else {
        visitTypeAlias(primitiveType, unqualifiedName, true);
      }

      emit("let");
      emit(unqualifiedName);
      emit(": {");
      emitBreak();
      indent();
      for (String elem : sorted(type.getElements())) {
        emit(elem);
        emit(":");
        // For string enums that have some literal values and some calculated values, we  try to use
        // the literal values as types as much as possible. For calculated values there's nothing
        // much we can do. Just back off and use the type alias.
        Node n = elements.get(elem);
        if (primitiveType.equals(stringType) && n.isString()) {
          emit("'" + escapeEcmaScript(n.getString()) + "'");
        } else {
          // No need to use type.getMembersType(), this must match the type alias we just declared.
          emit(unqualifiedName);
        }
        emit(",");
        emitBreak();
      }
      unindent();
      emit("}");
      emitNoSpace(";");
      emitBreak();
    }

    /**
     * Collect all literalInitializations with string literal values in the enum. Later we use these
     * literal initializers to complete the type alias.
     */
    private Set<String> collectAllLiterals(Map<String, Node> elements) {
      Set<String> literalInitializers = new TreeSet<>();
      for (Node n : elements.values()) {
        if (n.isString()) {
          literalInitializers.add(escapeEcmaScript(n.getString()));
        }
      }
      return literalInitializers;
    }

    /**
     * Attempt to convert the node to a string enum or numeric enum and return a boolean indicating
     * whether it successfully emitted the enum.
     */
    private boolean maybeStringOrNumericEnum(
        EnumType enumType,
        String unqualifiedName,
        Node objectOfAllMembers,
        Map<String, Node> elements) {

      JSType primitiveType = enumType.getEnumeratedTypeOfEnumObject();
      if (!primitiveType.equals(numberType) && !primitiveType.equals(stringType)) {
        return false;
      }

      // Look at all enum members. If any of the Closure string enum's values is not literal don't
      // emit anything and fall back to the safe conversion. Also, if any of the Closure string
      // enum's keys starts with a digit it's invalid in TS. Quoted digits are considered numeric as
      // well so they cannot be used as enum keys either.
      if (primitiveType.equals(stringType)) {
        for (Node c : objectOfAllMembers.children()) {
          if (Character.isDigit(c.getString().charAt(0))) {
            return false;
          }
          if (!c.getFirstChild().isString()) {
            return false;
          }
        }
      }

      maybeEmitJsDoc(enumType.getJSDocInfo(), /* ignoreParams= */ true);
      emit("enum");
      emit(unqualifiedName);
      emit("{");
      emitBreak();
      indent();

      for (String elem : sorted(elements.keySet())) {
        emit(elem);
        @Nullable Node n = elements.get(elem);
        if (n != null) {
          if (n.isNumber()) {
            emit("=");
            emit(String.valueOf(n.getDouble()));
          } else if (n.isString()) {
            emit("=");
            emit("'" + escapeEcmaScript(n.getString()) + "'");
          }
        }
        emit(",");
        emitBreak();
      }
      unindent();
      emit("}");
      emitBreak();
      return true;
    }

    private void visitTypeDeclaration(JSType type, boolean isVarArgs, boolean isOptionalPosition) {
      if (type != null) {
        emit(":");
        // From https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        // ArrayType:
        // PrimaryType [no LineTerminator here] [ ]
        if (isVarArgs) {
          visitTypeAsPrimary(type);
        } else {
          visitType(type, false, isOptionalPosition);
        }
        if (isVarArgs) emit("[]");
      }
    }

    /**
     * Emits a type that is not resolved by closure. Depending on compilation options (whether we
     * are assuming forward declarations or not) we either emit the defaultEmit string passed, or
     * the literal string that was in the original code. Special care is taken for templatized
     * types.
     */
    private void emitNoResolvedTypeOrDefault(NoType type, String defaultEmit) {
      if (!opts.partialInput || !type.isNoResolvedType()) {
        emit(defaultEmit);
        return;
      }
      // When processing partial inputs, this case handles implicitly forward declared types
      // for which we just emit the literal type written along with any type parameters.
      NoResolvedType nType = (NoResolvedType) type;
      // TODO(rado): Find a case where this happens for extends/implements and add
      // a test for it.
      if (nType.getReferenceName() == null) {
        emit(defaultEmit);
        return;
      }

      emitNoResolvedTypeAsumingForwardDeclare(type);
    }

    /**
     * Emits a type that is not resolved by closure, as the literal string that was in the original
     * code. Special care is taken for templatized types.
     */
    private void emitNoResolvedTypeAsumingForwardDeclare(ObjectType type) {
      String displayName = maybeRewriteImportedName(type.getDisplayName());
      String maybeGlobalName = maybeRenameGlobalType(displayName);
      if (maybeGlobalName == null) {
        typesUsed.add(displayName);
        displayName = Constants.INTERNAL_NAMESPACE + "." + displayName;
      } else {
        displayName = maybeGlobalName;
      }
      emit(displayName);
      List<JSType> templateTypes = type.getTemplateTypes();
      if (templateTypes != null && templateTypes.size() > 0) {
        emitGenericTypeArguments(type.getTemplateTypes());
      }
    }

    /**
     * In partial mode, closure doesn't know the correct name of imported symbols, if the name
     * matches one in the precomputed map, replace it with the original declared name The
     * displayName can be of the form foo.bar, but the symbol that was goog required was just foo,
     * so just replace the part of the display name before the first period
     */
    private String maybeRewriteImportedName(String displayName) {
      String baseDisplayName = DOT_SPLITTER.split(displayName).iterator().next();
      if (importRenameMap.containsKey(baseDisplayName)) {
        displayName = displayName.replace(baseDisplayName, importRenameMap.get(baseDisplayName));
      }
      return displayName;
    }

    /**
     * Adds parentheses to turn a Type grammar production into a PrimaryType. See
     * https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
     *
     * <p>Avoid adding extra parens where the type is already known to be Primary.
     *
     * <p>PrimaryType: ParenthesizedType ParenthesizedType: ( Type )
     */
    private void visitTypeAsPrimary(JSType type) {
      // These types will produce a non-primary grammar production
      if (!isLiteralFunction(type)
          && (type.isConstructor() || type.isFunctionType() || type.isUnionType())) {
        emit("(");
        visitType(type);
        emit(")");
      } else {
        visitType(type);
      }
    }

    private void visitType(JSType typeToVisit) {
      visitType(typeToVisit, false, false);
    }

    /** The namespace prefix for symbols in closure.lib.d.ts. */
    private String getGlobalSymbolNamespacePrefix() {
      if (this.isGoogNamespace) {
        return Constants.INTERNAL_NAMESPACE + ".";
      } else {
        return "";
      }
    }

    private void visitType(
        JSType typeToVisit, boolean skipDefCheck, final boolean inOptionalPosition) {
      // Known typedefs will be emitted symbolically instead of expanded.
      if (!skipDefCheck && typedefs.containsKey(typeToVisit)) {
        String typedefName = typedefs.get(typeToVisit);
        emit(Constants.INTERNAL_NAMESPACE + "." + typedefName);
        typesUsed.add(typedefName);
        return;
      }
      // See also JsdocToEs6TypedConverter in the Closure code base. This code is implementing the
      // same algorithm starting from JSType nodes (as opposed to JSDocInfo), and directly
      // generating textual output. Otherwise both algorithms should produce the same output.
      if (isPrivate(typeToVisit) && !isConstructor(typeToVisit.getJSDocInfo())) {
        // TypeScript does not allow public APIs that expose non-exported/private types. Just emit
        // an empty object literal type for those, i.e. something that cannot be used for anything,
        // except being passed around.
        emit(getGlobalSymbolNamespacePrefix() + "PrivateType");
        return;
      }
      Visitor<Void> visitor =
          new Visitor<Void>() {

            @Override
            public Void caseBooleanType() {
              emit("boolean");
              return null;
            }

            @Override
            public Void caseNumberType() {
              emit("number");
              return null;
            }

            @Override
            public Void caseStringType() {
              emit("string");
              return null;
            }

            @Override
            public Void caseSymbolType() {
              emit("symbol");
              return null;
            }

            @Override
            public Void caseObjectType(ObjectType type) {
              return emitObjectType(type, false);
            }

            @Override
            public Void caseUnionType(UnionType type) {
              visitUnionType(type, inOptionalPosition);
              return null;
            }

            @Override
            public Void caseNamedType(NamedType type) {
              JSType refType = type.getReferencedType();
              // When we dealing with partial inputs, we often end up with named type, without a
              // corresponding referencedType. Instead of emitting 'any', we emit literally the
              // name of the type as originally written.
              // It appears that when one writes '@type {A<B>}' and both are missing from the
              // compilation
              // unit - A ends up as NoType, while B ends up as NamedType.
              if (opts.partialInput && refType.isUnknownType()) {
                emitNoResolvedTypeAsumingForwardDeclare(type);
                return null;
              }
              // Handle "typeof expr" constructions, which translate directly to TypeScript.
              if (type.hasReferenceName() && type.getReferenceName().startsWith("typeof ")) {
                emit(type.getReferenceName());
                return null;
              }
              visitType(refType);
              return null;
            }

            @Override
            public Void caseTemplatizedType(TemplatizedType type) {
              return emitTemplatizedType(type, false);
            }

            @Override
            public Void caseTemplateType(TemplateType templateType) {
              emit(templateType.getReferenceName());
              return null;
            }

            @Override
            public Void caseNoType(NoType type) {
              emitNoResolvedTypeOrDefault(type, "any");
              return null;
            }

            @Override
            public Void caseAllType() {
              emit("any");
              return null;
            }

            @Override
            public Void caseNoObjectType() {
              emit("any");
              return null;
            }

            @Override
            public Void caseUnknownType() {
              emit("any");
              return null;
            }

            @Override
            public Void caseNullType() {
              emit("null");
              return null;
            }

            @Override
            public Void caseVoidType() {
              // In Closure "void" and "undefined" are type synonyms. Both types are
              // inhabited only by the value undefined.
              // In TS emitting "undefined" is more ideomatic in a general type position.
              // For function return types clutz emits "void" in visitFunctionDeclaration.
              // see:
              // https://github.com/google/closure-compiler/blob/caec92d5f62e745d20a0b4b8edb757d43b06baa0/src/com/google/javascript/rhino/jstype/JSTypeRegistry.java#L1011
              emit("undefined");
              return null;
            }

            @Override
            public Void caseEnumElementType(EnumElementType type) {
              emit(getAbsoluteName(type));
              typesUsed.add(type.getDisplayName());
              return null;
            }

            @Override
            public Void caseFunctionType(FunctionType type) {
              if (isLiteralFunction(type)) {
                emit("Function");
                return null;
              }
              if (type.isConstructor() && !"Function".equals(type.getDisplayName())) {
                visitConstructorFunctionDeclaration(type);
                return null;
              }
              visitFunctionParameters(type);
              JSType returnType = type.getReturnType();
              if (returnType != null) {
                emit("=>");
                // Closure conflates 'undefined' and 'void', and in general visitType always emits
                // `undefined`
                // for that type.
                // In idiomatic TypeScript, `void` is used for function return types, and the
                // "void",
                // "undefined" types are not the same.
                if (returnType.isVoidType()) {
                  emit("void");
                } else {
                  visitType(returnType);
                }
              }
              return null;
            }

            @Override
            public Void caseProxyObjectType(ProxyObjectType type) {
              type.visitReferenceType(this);
              return null;
            }
          };
      try {
        typeToVisit.visit(visitor);
      } catch (Exception e) {
        throw new RuntimeException("Failed to emit type " + typeToVisit, e);
      }
    }

    /** Whether the type was written as the literal 'Function' type */
    private boolean isLiteralFunction(JSType type) {
      return type.equals(typeRegistry.getNativeType(JSTypeNative.U2U_CONSTRUCTOR_TYPE));
    }

    private Void emitTemplatizedType(TemplatizedType type, boolean inImplementsExtendsPosition) {
      ObjectType referencedType = type.getReferencedType();
      String templateTypeName = getAbsoluteName(type);
      final ImmutableList<JSType> templateTypes = type.getTemplateTypes();
      if (typeRegistry.getNativeType(ARRAY_TYPE).equals(referencedType)
          && templateTypes.size() == 1) {
        // As per TS type grammar, array types require primary types.
        // https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        if (inImplementsExtendsPosition) {
          emit("Array<");
        }
        visitTypeAsPrimary(templateTypes.get(0));
        emit(inImplementsExtendsPosition ? ">" : "[]");
        return null;
      }

      final String displayName = type.getDisplayName();
      if (PlatformSymbols.NOT_TEMPLATIZED_IN_TYPESCRIPT.contains(displayName)) {
        emit(PlatformSymbols.CLOSURE_TO_TYPESCRIPT.getOrDefault(displayName, displayName));
        return null;
      }

      String maybeGlobalName = maybeRenameGlobalType(displayName);
      templateTypeName = maybeGlobalName == null ? templateTypeName : maybeGlobalName;

      if (templateTypes.isEmpty()) {
        // In Closure, subtypes of `TemplatizedType`s that do not take type arguments are still
        // represented by templatized types.
        emit(templateTypeName);
        typesUsed.add(displayName);
        return null;
      }
      if (typeRegistry.getNativeType(OBJECT_TYPE).equals(referencedType)) {
        checkState(templateTypes.size() == 2, templateTypes);
        emit("{");
        emitIndexSignature(templateTypes.get(0), templateTypes.get(1), false);
        emit("}");
        return null;
      }
      emit(templateTypeName);
      typesUsed.add(displayName);
      // TODO(b/140560697): Remove this restriction when TS 3.6 support is complete.
      boolean onlyEmitOneTemplateParameter =
          PlatformSymbols.ONLY_1_TEMPLATE_PARAM_FOR_TS_35.contains(templateTypeName);
      emitGenericTypeArguments(
          onlyEmitOneTemplateParameter ? ImmutableList.of(templateTypes.get(0)) : templateTypes);
      return null;
    }

    private void emitGenericTypeArguments(Iterable<JSType> iterable) {
      Iterator<JSType> it = iterable.iterator();
      emit("<");
      while (it.hasNext()) {
        visitType(it.next());
        if (it.hasNext()) {
          emit(",");
        }
      }
      emit(">");
    }

    private void emitIndexSignature(JSType keyType, JSType returnType, boolean emitBreak) {
      emit("[");
      // TS allows only number or string as index type of an object
      // https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.9.4
      if (keyType.isNumberValueType()) {
        emit("key: number");
      } else {
        if (!keyType.isStringValueType()) {
          emit("/* warning: coerced from " + keyType + " */");
        }
        emit("key: string");
      }
      emit("]:");
      visitType(returnType);

      if (emitBreak) {
        emit(";");
        emitBreak();
      }
    }

    /**
     * One can create recursive record types in closure using type inference. Since we emit them
     * inline, we cannot express that without introducing aliases. To avoid infinite recursion, we
     * store the types that we see during the traversal in this object.
     */
    Set<JSType> visitedRecordTypes = new LinkedHashSet<>();

    private void visitRecordType(ObjectType type) {
      visitedRecordTypes.add(type);
      emit("{");
      Iterator<String> it = getEmittablePropertyNames(type).iterator();
      while (it.hasNext()) {

        String propName = it.next();
        JSType propType = type.getPropertyType(propName);

        if (visitedRecordTypes.contains(propType)) {
          emitComment("Unsupported circular reference for prop name: " + propName);
          continue;
        }

        if (isValidJSProperty(propName)) {
          emit(propName);
        } else {
          emit("'" + propName + "'");
        }
        UnionType unionType = propType.toMaybeUnionType();
        if (unionType != null && unionType.getAlternates().stream().anyMatch(JSType::isVoidType)) {
          emit("?");

          visitTypeDeclaration(propType, false, true);
        } else {
          visitTypeDeclaration(propType, false, false);
        }

        if (it.hasNext()) {
          emit(",");
        }
      }
      emit("}");
      visitedRecordTypes.remove(type);
    }

    /**
     * Returns the (sorted) set of properties that should be emitted within types, i.e. on classes,
     * interfaces, or in object types.
     *
     * @param isStatic if true, skips properties that are likely namespaces during extern
     *     processing.
     */
    private Set<String> getTypePropertyNamesToEmit(final ObjectType type, boolean isStatic) {
      return Sets.filter(
          getEmittablePropertyNames(type),
          propName -> {
            // Extern processing goes through all known symbols, thus statics that are
            // representable as a namespace, are skipped here and emitted as namespaces only.
            // (see: extern_static_namespace output.d.ts)
            if (isExtern && isStatic && isLikelyNamespace(type.getOwnPropertyJSDocInfo(propName))) {
              return false;
            }
            if ("prototype".equals(propName)
                || "superClass_".equals(propName)
                // constructors are handled in #visitObjectType
                || "constructor".equals(propName)) {
              return false;
            }
            // Some symbols might be emitted as provides, so don't duplicate them.
            String qualifiedName = type.getDisplayName() + "." + propName;
            if (provides.contains(qualifiedName)) {
              return false;
            }
            JSType propertyType = type.getPropertyType(propName);
            if (isDefiningType(propertyType)) {
              // only emit properties here, types are emitted in walkInnerSymbols.
              return false;
            }
            return true;
          });
    }

    private Set<String> getEmittablePropertyNames(final ObjectType type) {
      return sorted(
          Sets.filter(
              type.getOwnPropertyNames(),
              propName ->
                  isEmittableProperty(type, propName)
                      && !isTypeCheckSuppressedProperty(type, propName)));
    }

    private Set<String> sorted(Set<String> elements) {
      return new TreeSet<>(elements);
    }

    private void visitUnionType(UnionType ut, boolean inOptionalPosition) {

      Collection<JSType> alts = ut.getAlternates();

      // When visiting an optional function argument or optional field (`foo?` syntax),
      // TypeScript will augment the provided type with an union of undefined, i.e. `foo?: T` will
      // means defacto `foo` has type `T | undefined` in the body.
      // Skip explicitly emitting the undefined union in such cases.
      if (inOptionalPosition) {
        alts = Collections2.filter(alts, input -> !input.isVoidType());
      }
      if (alts.size() == 0) {
        // If the only type was "undefined" and it got filtered, emit it explicitly.
        emit("undefined");
        return;
      }
      if (alts.size() == 1) {
        visitType(alts.iterator().next());
        return;
      }
      Iterator<JSType> it = alts.iterator();
      while (it.hasNext()) {
        // See https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        // UnionType:
        // UnionOrIntersectionOrPrimaryType | IntersectionOrPrimaryType
        visitTypeAsPrimary(it.next());
        if (it.hasNext()) {
          emit("|");
        }
      }
    }

    private void visitObjectType(
        FunctionType type, ObjectType prototype, List<String> classTemplateTypeNames) {
      emit("{");
      indent();
      emitBreak();
      // Prevent accidental structural typing - emit every class with a private field.
      if (type.isNominalConstructor() && !type.isInterface()) {
        emit("private noStructuralTyping_");
        // TypeScript does not allow overriding private properties from superclasses, so make sure
        // to emit a private property name that's specific to this type.
        String suffix = type.hasDisplayName() ? escapeForJSProperty(type.getDisplayName()) : "";
        emitNoSpace(suffix);
        emit(": any;");
        emitBreak();
      }
      // Constructors.
      if (type.isConstructor() && mustEmitConstructor(type) && !isPrivate(type.getJSDocInfo())) {
        maybeEmitJsDoc(type.getJSDocInfo(), /* ignoreParams */ false);
        // TODO(radokirov): mark constructor as private when source is annotated with
        // @private for ts v2.0 and greater
        emit("constructor");
        visitFunctionParameters(type, false, classTemplateTypeNames);
        emit(";");
        emitBreak();
      }

      Set<String> superClassFields = getSuperClassFields(type);

      // Fields.
      JSType instanceType = type.getTypeOfThis();
      checkArgument(
          instanceType.isObject(),
          "expected an ObjectType for this, but got "
              + instanceType
              + " which is a "
              + instanceType.getClass().getSimpleName());
      // TODO(evanm): investigate passing superClassFields in as skipNames.
      // We were accidentally passing it in for the wrong param, so
      // I "fixed" it by removing it, but maybe we should restore the
      // original intent.
      visitInstanceProperties(
          (ObjectType) instanceType,
          Collections.<String>emptySet(),
          Collections.<String>emptySet(),
          Collections.<String>emptyList());

      // Bracket-style property access for dictionnary...
      if (type.isDict()) {
        emitIndexSignature(
            compiler.getTypeRegistry().getNativeType(STRING_TYPE),
            compiler.getTypeRegistry().getNativeType(ALL_TYPE),
            true);
      }

      // ... and type that extends IObject or IArrayLike interfaces.
      // IArrayLike<T> extends IObject<number, T>. Normally only looking for IObject interface
      // should be enough. But the closure compiler seems to process these two interfaces as if they
      // were independent. A type can even implement both.
      Set<ObjectType> implementedInterfaces = getAllDirectlyImplementedInterfaces(type);
      boolean implementsIArrayLike = false;
      for (ObjectType implementedInterface : implementedInterfaces) {
        if (implementedInterface.getDisplayName().equals("IArrayLike")) implementsIArrayLike = true;
      }
      for (ObjectType implementedInterface : implementedInterfaces) {
        String displayName = implementedInterface.getDisplayName();
        ImmutableList<JSType> templateTypes = implementedInterface.getTemplateTypes();
        // IArrayLike extends IObject, but we can emit only one index signature.
        if ("IObject".equals(displayName) && !implementsIArrayLike) {
          List<JSType> iObjectTemplateTypes = templateTypes;
          if (templateTypes != null && templateTypes.size() > 1) {
            emitIndexSignature(iObjectTemplateTypes.get(0), iObjectTemplateTypes.get(1), true);
          } else {
            emitIndexSignature(unknownType, unknownType, true);
          }
        } else if ("IArrayLike".equals(displayName)) {
          if (templateTypes != null && templateTypes.size() > 0) {
            emitIndexSignature(numberType, templateTypes.get(0), true);
          } else {
            emitIndexSignature(numberType, unknownType, true);
          }
        }
      }
      maybeEmitSymbolIterator(instanceType);

      // Prototype fields (mostly methods).
      visitInstanceProperties(
          prototype,
          ((ObjectType) instanceType).getOwnPropertyNames(),
          superClassFields,
          classTemplateTypeNames);

      // Static fields and methods
      // Note that for interfaces we cannot emit emit them here, as that is invalid TS.
      // Instead we emit them in an auxilary namespace that shares the same name.
      // That happens in the visitClassOrInterface method.
      if (!type.isInterface()) {
        Set<String> staticProps = getTypePropertyNamesToEmit(type, true);
        visitStaticProperties(type, staticProps, /* isInNamespace*/ false);
      }
      unindent();
      emit("}");
      emitBreak();
    }

    /**
     * If a constructor statement is not emitted TS will assume a constructor with no arguments and
     * no body (default ctor) for base classes, or the constructor of the superclass.
     *
     * <p>Omitting the constructor is correct only if the closure class and *all* its superclasses
     * have zero argument constructors. If the supertype is NoResolvedType we cannot know whether
     * that's the case so we must return true.
     */
    private boolean mustEmitConstructor(FunctionType type) {
      while (type != null) {
        if (type.getParameters().iterator().hasNext()) return true;
        ObjectType oType = getSuperType(type);
        if (oType == null) return false;
        if (oType.isNoResolvedType()) return true;
        type = oType.getConstructor();
      }
      return false;
    }

    /**
     * Returns all interfaces implemented by a class and any superinterface for any of those
     * interfaces.
     */
    public Set<ObjectType> getAllDirectlyImplementedInterfaces(FunctionType type) {
      Set<ObjectType> interfaces = new LinkedHashSet<>();

      for (ObjectType implementedInterface : type.getOwnImplementedInterfaces()) {
        addRelatedInterfaces(implementedInterface, interfaces);
      }
      return interfaces;
    }

    private void addRelatedInterfaces(ObjectType instance, Set<ObjectType> interfaces) {
      FunctionType constructor = instance.getConstructor();
      if (constructor != null && constructor.isInterface() && !interfaces.contains(instance)) {
        interfaces.add(instance);

        for (ObjectType interfaceType : instance.getCtorExtendedInterfaces()) {
          addRelatedInterfaces(interfaceType, interfaces);
        }
      }
    }

    /**
     * Emits the given set of properties.
     *
     * @param isInNamespace if true, emit the properties in a form suitable for namespace members
     *     (e.g. with "let" and "function" prefixes). If false, emit suitable for properties
     *     declared in a class or interface.
     */
    private void visitStaticProperties(
        ObjectType objType, Set<String> propNames, boolean isInNamespace) {
      for (String propName : propNames) {
        if (isInNamespace) {
          JSType propType = objType.getPropertyType(propName);
          if (propType.toMaybeFunctionType() == null) {
            emit("let");
          } else {
            emit("function");
          }
        }
        visitProperty(
            propName,
            objType,
            !isInNamespace,
            false,
            isInNamespace,
            Collections.<String>emptyList());
      }
    }

    private void visitInstanceProperties(
        ObjectType objType,
        Set<String> skipNames,
        Set<String> forceProps,
        List<String> classTemplateTypeNames) {
      for (String propName : getTypePropertyNamesToEmit(objType, false)) {
        if (skipNames.contains(propName)) continue;
        visitProperty(
            propName, objType, false, forceProps.contains(propName), false, classTemplateTypeNames);
      }
    }

    /**
     * Emits a [Symbol.iterator] property on the class if it implements the Iterable interface or
     * IteratorIterable.
     *
     * <p>JSCompiler does not understand nor represent Symbol properties, so we cannot just emit the
     * property in the loop above, and must guess on the actual return type of the iterator method.
     */
    private void maybeEmitSymbolIterator(JSType instanceType) {
      if (instanceType == null) {
        return;
      }
      // iteratorIterableType will be null if not found in the current run's externs definitions.
      JSType implemented;
      String returnType;

      // Unfortunately, this method of detecting whether a class implements Iterator, is error-prone
      // in cases where the extension goes through another extends clause. Consider, C extends D,
      // and D implements Iterable.
      // In such cases C doesn't need to emit anything new, because D's emit would have handled
      // that.
      // Here we detect one such case - D being the always-present Array type and skip unnecessary
      // custom emit.
      if (instanceType.isSubtype(arrayType)) {
        return;
      }

      // It appears that iterableType is always defined. Moreover, in partial mode when extending
      // an unknown base, the isSubtype check always returns true. This is not that surprising,
      // because when the base is unknown the only correct answer is unknown, not true or false.
      //
      // Emitting a [Symbol.iterator()] signature for all record/interfaces that extend an unknown
      // base is too limiting, as it doesn't allow assigning object literal to those interfaces.
      // So instead we detect when an interface extends a base and skip emitting the extra signature
      // in the case of unknown base.
      // For unknown reasons instanceType.isInterface() return false, so we turn off the emit for
      // all partial input compilations.
      if (iteratorIterableType != null && instanceType.isSubtype(iteratorIterableType)) {
        implemented = iteratorIterableType;
        returnType = "IterableIterator";
      } else if (iterableType != null
          && instanceType.isSubtype(iterableType)
          && !opts.partialInput) {
        implemented = iterableType;
        returnType = "Iterator";
      } else {
        return;
      }
      emitComment("Symbol.iterator inserted by Clutz for Iterable subtype");
      emit("[Symbol.iterator](): ");
      // The actual implementation of iterator could be an arbitrary subtype of Iterable. Emit
      // the type of the interface as the next best thing.
      emit(returnType);
      emit("<");
      TemplateType templateType = implemented.getTemplateTypeMap().getTemplateKeys().get(0);
      TemplateTypeMap ttMap = instanceType.getTemplateTypeMap();
      // Known issue: ttMap does not expose getUnresolvedTemplateType, which would be required
      // to correctly emit unbound template parameters, e.g. "<T>".
      JSType resolvedTemplateType = ttMap.getResolvedTemplateType(templateType);
      visitType(resolvedTemplateType, false, false);
      emit(">");
      emit(";");
      emitBreak();
    }

    /**
     * Returns the names of props that would be output as fields (not methods) on superclasses of
     * the given class.
     */
    private Set<String> getSuperClassFields(FunctionType ftype) {
      Set<String> fields = new LinkedHashSet<>();
      ObjectType superType = getSuperType(ftype);
      // The UNKONWN type has a null constructor. One cannot extend UNKNOWN directly, but this
      // code can be reached when clutzing a non-closure-valid program.
      while (superType != null && superType.getConstructor() != null) {
        aggregateFieldsFromClass(fields, superType);
        superType = getSuperType(superType.getConstructor());
      }
      return fields;
    }

    private void aggregateFieldsFromClass(Set<String> fields, ObjectType superType) {
      // visit instance properties.
      for (String field : superType.getOwnPropertyNames()) {
        if (!superType.getPropertyType(field).isFunctionType()) {
          fields.add(field);
        }
      }
      // visit prototype properties.
      if (superType.getConstructor() != null
          && superType.getConstructor().getPrototype() != null
          && superType.getConstructor().getPrototype().getOwnPropertyNames() != null) {
        for (String field : superType.getConstructor().getPrototype().getOwnPropertyNames()) {
          // getPropertyType works with non-owned property names, i.e. names from the prototype
          // chain.
          if (!superType.getPropertyType(field).isFunctionType()) {
            fields.add(field);
          }
        }
      }
    }

    private void visitProperty(
        String propName,
        ObjectType objType,
        boolean isStatic,
        boolean forcePropDeclaration,
        boolean isNamespace,
        List<String> classTemplateTypeNames) {
      JSType propertyType = objType.getPropertyType(propName);
      // The static methods from the function prototype are provided by lib.d.ts.
      if (isStatic && isFunctionPrototypeProp(propName)) return;
      JSDocInfo jsdoc = objType.getOwnPropertyJSDocInfo(propName);
      maybeEmitJsDoc(jsdoc, /* ignoreParams */ false);
      boolean isProtected = isProtectedProperty(objType, propName);
      JSDocInfo jsDocInfo = objType.getOwnPropertyJSDocInfo(propName);
      boolean isAbstract = jsDocInfo != null && jsDocInfo.isAbstract();
      emitProperty(
          propName,
          propertyType,
          isStatic,
          isProtected,
          isAbstract,
          forcePropDeclaration,
          isNamespace,
          classTemplateTypeNames);
    }

    /**
     * Look up the visibility of the overridden property recursively. In Closure, a child class can
     * override an implicit public property with tighter visibility, but it is not allowed in
     * TypeScript. So clutz ignores and emits it as a public property.
     */
    private boolean isProtectedProperty(ObjectType prototype, final String propName) {
      Visibility visibility = Visibility.INHERITED;
      while (prototype != null) {
        if (prototype.hasOwnProperty(propName)) {
          final JSDocInfo jsDocInfo = prototype.getOwnPropertyJSDocInfo(propName);
          if (jsDocInfo != null) {
            visibility = jsDocInfo.getVisibility();
          }
        }
        prototype = prototype.getImplicitPrototype();
      }
      return visibility == Visibility.PROTECTED;
    }

    private void emitProperty(
        String propName,
        JSType propertyType,
        boolean isStatic,
        boolean isProtected,
        boolean isAbstract,
        boolean forcePropDeclaration,
        boolean isNamespace,
        List<String> classTemplateTypeNames) {
      if (handleSpecialTTEFunctions(propertyType, propName, isStatic, classTemplateTypeNames))
        return;

      if (isProtected) emit("protected");
      // "static abstract" is illegal TypeScript, drop "abstract"
      if (isStatic) {
        emit("static");
      } else if (isAbstract) {
        emit("abstract");
      }
      emit(propName);
      if (!propertyType.isFunctionType() || forcePropDeclaration) {
        UnionType unionType = propertyType.toMaybeUnionType();
        boolean isOptionalProperty = false;
        // emitProperty is used to emit properties on object, as well as namespaces.  The ? optional
        // syntax is only valid for objects.
        if (unionType != null
            && unionType.getAlternates().stream().anyMatch(JSType::isVoidType)
            && !isNamespace) {
          emit("?");
          isOptionalProperty = true;
        }
        visitTypeDeclaration(propertyType, false, isOptionalProperty);
      } else {
        FunctionType ftype = (FunctionType) propertyType;
        if (specialCaseMapEntries(propName, ftype)) {
          return;
        }
        // Avoid re-emitting template variables defined on the class level if method is not static.
        List<String> skipTemplateParams =
            isStatic ? Collections.emptyList() : classTemplateTypeNames;
        visitFunctionDeclaration(ftype, skipTemplateParams);
      }
      emit(";");
      emitBreak();
    }

    /**
     * Closure Compiler does not support tuple types, and thus cannot express the proper type for
     * "Map<K, V>.entries()", which is an IterableIterator of a [K, V] tuple. The tighter tuple type
     * [K, V] allows destructuring loops "for (const [x, y] of ...)" with the tuple values getting
     * the right types assigned.
     *
     * <p>Given that maps are very common, as are for loops over them, this special cases methods
     * called "entries" that have the right return type.
     */
    private boolean specialCaseMapEntries(String propName, FunctionType propertyType) {
      if (propertyType.getMaxArity() != 0 || !propName.equals("entries")) {
        return false;
      }

      // we have entries(): returnType
      JSType returnType = propertyType.getReturnType();
      if (!returnType.getDisplayName().equals("IteratorIterable")) {
        return false;
      }

      // we have entries(): IteratorIterable<valueType, iteratorReturnType, nextParamType>
      // TODO(b/140560697): Stop ignoring return and param types when upgrade to TS 3.6 is complete.
      //
      // In incremental mode IteratorIterable is noResolvedType, while in total mode it is
      // TemplatizedType.
      // They both have getTemplateTypes, but neither extends the other in the class hierarchy.
      final JSType valueType;
      if (returnType.isTemplatizedType()) {
        valueType = returnType.toMaybeTemplatizedType().getTemplateTypes().get(0);
      } else {
        // IteratorIterable must always have template types, even if they're unknown
        checkState(returnType.isNoResolvedType(), returnType);
        valueType = ((NoResolvedType) returnType).getTemplateTypes().get(0);
      }

      if (!isTemplateOf(valueType, "Array")) {
        return false;
      }

      // we have entries() : IteratorIterable<Array<arrayMembers>>
      JSType arrayMembers = valueType.toMaybeTemplatizedType().getTemplateTypes().get(0);
      if (!arrayMembers.isUnionType()
          || arrayMembers.toMaybeUnionType().getAlternates().size() != 2) {
        return false;
      }

      // we have entries() : IteratorIterable<Array<KEY|VALUE>
      emit("(): IterableIterator<[");
      Iterator<JSType> it = arrayMembers.toMaybeUnionType().getAlternates().iterator();
      visitType(it.next());
      emit(",");
      visitType(it.next());
      emit("]>;");
      emitBreak();
      return true;
    }

    private boolean isTemplateOf(JSType type, String typeName) {
      return type.isTemplatizedType()
          && type.toMaybeTemplatizedType().getReferenceName().equals(typeName);
    }

    /**
     * Closure has an experimental feature - Type Transformation Expression (TTE) - used to type
     * functions like Promise.then and Promise.all. The feature is rarely used and impossible to
     * translate to TS, so we just hard code some type signature. Yuk!
     *
     * <p>This is a hack and won't scale, but I hope TTE will have very limited usage.
     *
     * <p>Returns whether this was a TTE function and handled specially.
     */
    private boolean handleSpecialTTEFunctions(
        JSType type, String propName, boolean isStatic, List<String> classTemplateTypeNames) {
      FunctionType ftype = type.toMaybeFunctionType();
      if (ftype == null) return false;

      boolean hasTTE = false;
      for (TemplateType templateKey : ftype.getTemplateTypeMap().getTemplateKeys()) {
        if (templateKey.getTypeTransformation() != null) {
          hasTTE = true;
          break;
        }
      }

      // Horrible hack.  goog.async.Deferred has an @override of a TTE function, but when running
      // in partialInput mode we can't see that.  Identify it by grabbing:
      // 1) functions named .then()
      // 2) that use @override
      // 3) that have no declared parameters/return type.
      boolean horribleHackForPartialModeWithOverrides = false;
      JSDocInfo info = type.getJSDocInfo();
      if (info != null) {
        boolean isUntypedOverride =
            info.isOverride() && info.getParameterCount() == 0 && info.getReturnType() == null;
        if (opts.partialInput && isUntypedOverride && propName.equals("then")) {
          horribleHackForPartialModeWithOverrides = true;
        }
      }

      if (!horribleHackForPartialModeWithOverrides && !hasTTE) return false;

      // The same signature can be found in a number of classes - es6 Promise, angular.$q.Promise,
      // custom Thenable classes, etc. While the class names differ the implementations are close
      // enough that we use the same signature for all of them.
      // Only customization needed is plugging in the correct class name.
      String templateTypeSig =
          isStatic
              ? getSignatureForStaticTTEFn(propName, ftype)
              : getSignatureForInstanceTTEFn(propName, classTemplateTypeNames, ftype);
      if (templateTypeSig == null) {
        emit("/* function had TTE, but not a known translation. Emitted type is likely wrong. */");
        emitBreak();
        return false;
      }
      emit(templateTypeSig);
      emitBreak();
      return true;
    }

    private String getSignatureForInstanceTTEFn(
        String propName, List<String> classTemplateTypeNames, FunctionType ftype) {
      // If ftype is foo.bar.Promise.prototype.then, extract className as ಠ_ಠ.clutz.foo.bar.Promise.
      String className =
          Constants.INTERNAL_NAMESPACE + "." + getNamespace(getNamespace(ftype.getDisplayName()));
      Iterator<String> templateTypeNames = classTemplateTypeNames.iterator();
      if (!templateTypeNames.hasNext()) return null;

      String templateVarName = templateTypeNames.next();

      // TODO(lucassloan): goog.Promise has bad types (caused by an inconsistent number of generic
      // type params) that are coerced to any, so explicitly emit any for the return type and
      // fix when the callers have been fixed.
      String classTemplatizedType =
          className.equals("ಠ_ಠ.clutz.goog.Promise") ? " any" : className + " < RESULT >";
      // The AngularJS promise type should match the TypeScript type declaration since they describe
      // the same runtime.
      if (propName.equals("then")) {
        if (className.equals("ಠ_ಠ.clutz.angular.$q.Promise")) {
          return "then < RESULT > (opt_onFulfilled ? : ( (a : "
              + templateVarName
              + " ) => "
              + classTemplatizedType
              + " | RESULT | "
              + className
              + "<never>) | null , "
              + "opt_onRejected ? : ( (a : any ) => any ) | null) : "
              + classTemplatizedType
              + " ;";
        } else {
          return "then < RESULT > (opt_onFulfilled ? : ( (a : "
              + templateVarName
              + " ) => PromiseLike < RESULT > | RESULT ) | null , "
              + "opt_onRejected ? : ( (a : any ) => any ) | null) : "
              + classTemplatizedType
              + " ;";
        }
      }
      if (propName.equals("when")) {
        return "when < RESULT, T > (value: T, successCallback: (promiseValue: T) => "
            + classTemplatizedType
            + "|RESULT, errorCallback: null | undefined | "
            + " ((reason: any) => any), notifyCallback?: (state: any) => any): "
            + classTemplatizedType
            + ";";
      }
      String promiseName = className + ".Promise";
      return getPromiseMethod(propName, promiseName);
    }

    private String getSignatureForStaticTTEFn(String propName, FunctionType ftype) {
      // If ftype is foo.bar.Promise.all, extract className as ಠ_ಠ.clutz.foo.bar.Promise.
      String className = Constants.INTERNAL_NAMESPACE + "." + getNamespace(ftype.getDisplayName());
      String maybePromiseMethod = getPromiseMethod(propName, className);
      if (maybePromiseMethod != null) {
        return "static " + maybePromiseMethod;
      }
      return null;
    }

    private String getPromiseMethod(String propName, String className) {
      switch (propName) {
        case "resolve":
          // TODO(lucassloan): goog.Promise has bad types that are coerced to any, so explicitly
          // emit any
          // and change to the proper type `(value: googPromise< T , any > | T): googPromise<T,
          // any>`
          // when the callers have been fixed.
          if (className.equals("ಠ_ಠ.clutz.goog.Promise")) {
            return "resolve < T >(value: PromiseLike < T > | T): any;";
          } else {
            return "resolve < T >(value: PromiseLike < T > | T): " + className + " < T >;";
          }
        case "race":
          return "race < T > (values : T [] ) : " + className + " < T > ;";
          // TODO(rado): angular.d.ts has improved types for .all, replace with all overrides from
          // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/angular/index.d.ts#L1014
        case "all":
          return "all(promises : " + className + " < any > [] ) : " + className + " < any [] > ;";
        default:
      }
      return null;
    }

    private List<String> getTemplateTypeNames(ObjectType objType) {
      if (objType.getTemplateTypeMap() == null) {
        return Collections.emptyList();
      }
      return objType.getTemplateTypeMap().getTemplateKeys().stream()
          .map(jsType -> jsType != null ? jsType.getDisplayName() : "")
          .collect(toImmutableList());
    }

    private void visitFunctionDeclaration(FunctionType ftype, List<String> skipTemplateParams) {
      visitFunctionParameters(ftype, true, skipTemplateParams);
      JSType type = ftype.getReturnType();
      final JSType typeOfThis = ftype.getTypeOfThis();

      if (type == null) return;
      emit(":");
      // Closure conflates 'undefined' and 'void', and in general visitType always emits `undefined`
      // for that type.
      // In idiomatic TypeScript, `void` is used for function return types, and the "void",
      // "undefined" types are not the same.
      if (type.isVoidType()) {
        emit("void");
      } else if (typeOfThis != null && typeOfThis.isTemplateType() && typeOfThis.equals(type)) {
        // Special case: prefer polymorphic `this` type to templatized `this` param
        emit("this");
      } else {
        visitType(type);
      }
    }

    private void visitConstructorFunctionDeclaration(FunctionType ftype) {
      // Translate constructor functions to object type literals with a construct signature.
      // "function(new:X, string)" --> "{new(a: string): X}".
      emit("{");
      emit("new");
      visitFunctionParameters(ftype);
      emit(":");
      visitType(ftype.getInstanceType());
      emit("}");
    }

    private boolean allParametersUnknown(FunctionType ftype) {
      for (Node param : ftype.getParameters()) {
        JSType type = param.getJSType();
        // Note: template types (e.g. the T in Array<T>) return true for isUnknownType,
        // so we check that first.
        if (type.isTemplateType() || !type.isUnknownType()) return false;
      }
      return true;
    }

    private void visitFunctionParameters(FunctionType ftype) {
      visitFunctionParameters(ftype, true, Collections.<String>emptyList());
    }

    /** Gets the string name from a function parameter node, or "" if we cannot find one. */
    private String getParameterName(Node node) {
      if (node.isDefaultValue()) {
        node = node.getFirstChild();
      }
      if (node.isRest()) {
        node = node.getOnlyChild();
      }

      if (node.isName()) {
        return node.getString();
      } else {
        // Use a simple invalid name for complex parameters.
        return "";
      }
    }

    private void visitFunctionParameters(
        FunctionType ftype, boolean emitTemplatizedTypes, List<String> alreadyEmittedTemplateType) {
      final boolean shouldSkipEmittingThis = shouldSkipEmittingThisTemplateAndParam(ftype);
      if (shouldSkipEmittingThis) {
        // alreadyEmittedTemplateType might be an immutable list.
        alreadyEmittedTemplateType = new ArrayList<>(alreadyEmittedTemplateType);
        alreadyEmittedTemplateType.add(ftype.getTypeOfThis().getDisplayName());
      }
      if (emitTemplatizedTypes) {
        visitTemplateTypes(ftype, alreadyEmittedTemplateType, true);
      }
      // In partial mode when all the parameters to the function are unknown, it might be the
      // case that the function is overriding/implementing a superclass or interface that is in an
      // unseen input.
      // If so, we can't know whether the parameters are optional or not, so mark them optional.
      // This is too broad (we also affect callback types) but we can fix that if it's a problem.
      boolean makeAllParametersOptional = opts.partialInput && allParametersUnknown(ftype);
      emit("(");
      Iterator<Node> parameters = ftype.getParameters().iterator();
      if (!shouldSkipEmittingThis) {
        emitThisParameter(ftype, parameters);
      }
      Iterator<String> names = null;
      Node functionSource = ftype.getSource();
      if (functionSource != null && functionSource.isClass()) {
        Node members = functionSource.getLastChild();
        for (Node member : members.children()) {
          if (member.isMemberFunctionDef() && member.getString().equals("constructor")) {
            functionSource = member.getOnlyChild();
            break;
          }
        }
      }
      if (functionSource != null && functionSource.isFunction()) {
        // functionSource AST: FUNCTION -> (NAME, PARAM_LIST, BLOCK ...)
        Iterable<Node> parameterNodes = functionSource.getFirstChild().getNext().children();
        // TODO(bradfordcsmith): This will need to be updated when transpilation of default
        //   and destructured parameters stops happening in checks-only compilation.
        names = transform(parameterNodes, (node) -> this.getParameterName(node)).iterator();
      }

      int paramCount = 0;
      while (parameters.hasNext()) {
        Node param = parameters.next();
        if (param.isVarArgs()) {
          emit("...");
        }

        String pName = "";
        if (names != null && names.hasNext()) {
          pName = names.next();
        }
        if (pName.isEmpty()) {
          // If we cannot find a name for the parameter, just generate one.
          if (paramCount < 26) {
            pName = Character.toString((char) (97 + paramCount));
          } else {
            pName = "p" + (paramCount - 26);
          }
        }
        emitNoSpace(pName);
        paramCount++;

        // In TypeScript ...a?: any[] is illegal, so we can only make non-varargs optional.
        if ((param.isOptionalArg() || makeAllParametersOptional) && !param.isVarArgs()) {
          emit("?");
          visitTypeDeclaration(param.getJSType(), param.isVarArgs(), true);
        } else {
          visitTypeDeclaration(param.getJSType(), param.isVarArgs(), false);
        }
        if (parameters.hasNext()) {
          emit(", ");
        }
      }
      emit(")");
    }

    /**
     * Special handling for simple typing returning polymorphic this type in TypeScript. Prefer
     * `func(): this` instead of `func&lt;T&gt;(this: T): T` when any params are not templatized.
     */
    private boolean shouldSkipEmittingThisTemplateAndParam(FunctionType ftype) {
      final JSType typeOfThis = ftype.getTypeOfThis();
      if (typeOfThis == null
          || !typeOfThis.isTemplateType()
          || !typeOfThis.equals(ftype.getReturnType())) {
        return false;
      }
      Iterator<Node> parameters = ftype.getParameters().iterator();
      while (parameters.hasNext()) {
        final JSType paramType = parameters.next().getJSType();
        if (!paramType.isTemplatizedType()) {
          continue;
        }
        final TemplateTypeMap templateTypeMap = paramType.getTemplateTypeMap();
        for (TemplateType key : templateTypeMap.getTemplateKeys()) {
          if (templateTypeMap.getResolvedTemplateType(key).equals(typeOfThis)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * Emit a this parameter like `func(this: Foo)` in a function parameters.
     *
     * <p>TODO: emit for non-templatized this like `function(this: HTMLElement)`
     */
    private void emitThisParameter(FunctionType ftype, Iterator<Node> parameters) {
      final JSType typeOfThis = ftype.getTypeOfThis();
      // Don't emit for a constructor like `function(new: T)`.
      // A `this` parameter in a constructor is not allowed in TypeScript.
      if (typeOfThis == null || ftype.isConstructor()) {
        return;
      }
      final JSDocInfo jsDocInfo = ftype.getJSDocInfo();
      // Emit for templatized this param like `function(this: T)` or JSDoc `@this` type.
      if (!typeOfThis.isTemplateType() && (jsDocInfo == null || jsDocInfo.getThisType() == null)) {
        return;
      }
      emitNoSpace("this :");
      visitType(typeOfThis);
      if (parameters.hasNext()) {
        emit(", ");
      }
    }

    void walkInnerSymbols(ObjectType type, String innerNamespace) {
      // TODO(martinprobst): This curiously duplicates visitProperty above. Investigate the code
      // smell and reduce duplication (or figure out & document why it's needed).

      // We collect the AST Node so we can extract the enum value when generating the declaration
      // file, this is only useful for numeric enums and other enum types don't use the node object.
      Map<NamedTypePair, Node> innerProps = new TreeMap<>();
      // No type means the symbol is a typedef.
      if (type.isNoType() && childListMap.containsKey(innerNamespace)) {
        // For typedefs, the inner symbols are not accessible as properties.
        // We iterate over all symbols to find possible inner symbols.
        for (TypedVar symbol : childListMap.get(innerNamespace)) {
          if (getNamespace(symbol.getName()).equals(innerNamespace)) {
            innerProps.put(
                new NamedTypePair(symbol.getType(), getUnqualifiedName(symbol.getName())),
                symbol.getNode());
          }
        }
      } else {
        Map<String, Node> nodes = new LinkedHashMap<>();
        for (TypedVar symbol : childListMap.get(innerNamespace)) {
          if (symbol.getName() != null && symbol.getNode() != null)
            nodes.put(symbol.getName(), symbol.getNode());
        }
        for (String propName : getEmittablePropertyNames(type)) {
          innerProps.put(
              new NamedTypePair(type.getPropertyType(propName), propName),
              nodes.get(innerNamespace + "." + propName));
        }
      }

      boolean foundNamespaceMembers = false;
      for (NamedTypePair namedType : innerProps.keySet()) {
        String propName = namedType.name;
        JSType pType = namedType.type;
        String qualifiedName = innerNamespace + '.' + propName;
        if (provides.contains(qualifiedName)) continue;
        Node node = innerProps.get(namedType);
        // Node might be null in some edge cases. For example when "type not found in Closure
        // type registry" comment emmited below.
        StaticSourceFile sourceFile = node == null ? null : node.getStaticSourceFile();
        if (pType.isEnumType()) {
          if (!foundNamespaceMembers) {
            emitGeneratedFromFileComment(sourceFile);
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          visitEnumType(propName, qualifiedName, (EnumType) pType, node);
        } else if (isClassLike(pType)) {
          if (!foundNamespaceMembers) {
            emitGeneratedFromFileComment(sourceFile);
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          visitClassOrInterface(propName, (FunctionType) pType);
        } else if (isTypedef(pType)) {
          if (!foundNamespaceMembers) {
            emitGeneratedFromFileComment(sourceFile);
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          JSType registryType = typeRegistry.getGlobalType(qualifiedName);
          if (registryType != null) {
            visitTypeAlias(registryType, propName, false);
          } else {
            emitComment(
                "Intended to visit type alias '"
                    + innerNamespace
                    + "."
                    + propName
                    + " but type not found in Closure type registry.");
          }
        }
        // Non-type defining static properties are handled for provided and unprovided
        // interfaces in visitClassOrInterface.
      }
      if (foundNamespaceMembers) emitNamespaceEnd();

      // Recursively repeat the process for inner types of inner types.
      for (NamedTypePair namedType : innerProps.keySet()) {
        JSType pType = namedType.type;
        String qualifiedName = innerNamespace + '.' + namedType.name;
        if (provides.contains(qualifiedName)) continue;

        // This probably could be extended to enums and interfaces, but I rather wait for for some
        // real world use-cases before supporting what seems like a bad way to organize closure
        // code.
        if (isClassLike(pType)) {
          walkInnerSymbols((FunctionType) pType, qualifiedName);
        }
      }
    }

    private void visitFunctionExpression(String propName, FunctionType ftype) {
      emit("function");
      emit(propName);
      visitFunctionDeclaration(ftype, Collections.<String>emptyList());
      emit(";");
      emitBreak();
    }

    public void emitPrivateValue(String emitName) {
      emit("let");
      emit(getUnqualifiedName(emitName));
      emit(":");
      emit(getGlobalSymbolNamespacePrefix() + "PrivateType;");
      emitBreak();
    }

    public Void emitObjectType(ObjectType type, boolean inExtendsImplementsPosition) {
      // Closure doesn't require that all the type params be declared, but TS does
      if (!type.getTemplateTypeMap().isEmpty()
          && !typeRegistry.getNativeType(OBJECT_TYPE).equals(type)) {
        return emitTemplatizedType(
            typeRegistry.createTemplatizedType(type), inExtendsImplementsPosition);
      }
      String maybeGlobalName = maybeRenameGlobalType(type.getDisplayName());
      if (maybeGlobalName != null) {
        emit(maybeGlobalName);
      } else if (type.isDict()) {
        emit("{[key: string]: any}");
      } else if (type.getReferenceName() != null) {
        String name = getAbsoluteName(type);
        // Under special conditions (see prototype_inferred_type.js) closure can infer
        // the type be the prototype object. TypeScript has nothing that matches the shape
        // of the prototype object (surprisingly typeof A.prototype is A). The best we can do is
        // any.
        if (name.endsWith(".prototype")) {
          emit("any");
          return null;
        }
        if (this.isGoogNamespace && name.equals("global this")) {
          emit("any");
          return null;
        }
        emit(name);
        if (!type.getDisplayName().equals("Object")) {
          typesUsed.add(type.getDisplayName());
        }
      } else {
        visitRecordType(type);
      }
      return null;
    }

    /**
     * If a symbol refers to a "platform" type (e.g. Promise) emit return its platform name,
     * otherwise, return null.
     */
    private String maybeRenameGlobalType(String name) {
      String globalName = null;
      if (PlatformSymbols.GLOBAL_SYMBOL_ALIASES.contains(name)) {
        // See comment on GLOBAL_SYMBOL_ALIASES.
        globalName = getGlobalSymbolNamespacePrefix() + "Global" + name;
      } else if (PlatformSymbols.CLOSURE_TO_TYPESCRIPT.get(name) != null) {
        globalName = PlatformSymbols.CLOSURE_TO_TYPESCRIPT.get(name);
      } else if (PlatformSymbols.TYPESCRIPT_LIB_D_TS.contains(name)) {
        // Assume it's safe to emit the name as-is.
        globalName = name;
      }

      return globalName;
    }

    /**
     * A type visitor used for types in Foo extends <...> and Foo implements <...> positions. Unlike
     * the type visitor for a generic type declaration (i.e. var a: <...>), this visitor only emits
     * symbols that are valid in an extends/implements position. For example: 'class A extends () =>
     * any' is invalid, even though () => any is a valid type.
     */
    class ExtendsImplementsTypeVisitor implements Visitor<Void> {
      @Override
      public Void caseObjectType(ObjectType type) {
        emitObjectType(type, true);
        return null;
      }

      @Override
      public Void caseUnknownType() {
        return null;
      }

      @Override
      public Void caseNullType() {
        return null;
      }

      @Override
      public Void caseNamedType(NamedType type) {
        return null;
      }

      @Override
      public Void caseProxyObjectType(ProxyObjectType type) {
        return null;
      }

      @Override
      public Void caseNumberType() {
        return null;
      }

      @Override
      public Void caseStringType() {
        return null;
      }

      @Override
      public Void caseSymbolType() {
        return null;
      }

      @Override
      public Void caseVoidType() {
        return null;
      }

      @Override
      public Void caseUnionType(UnionType type) {
        return null;
      }

      @Override
      public Void caseTemplatizedType(TemplatizedType type) {
        emitTemplatizedType(type, true);
        return null;
      }

      @Override
      public Void caseTemplateType(TemplateType templateType) {
        return null;
      }

      @Override
      public Void caseNoType(NoType type) {
        emitNoResolvedTypeOrDefault(type, "ClutzMissingBase");
        return null;
      }

      @Override
      public Void caseEnumElementType(EnumElementType type) {
        return null;
      }

      @Override
      public Void caseAllType() {
        return null;
      }

      @Override
      public Void caseBooleanType() {
        return null;
      }

      @Override
      public Void caseNoObjectType() {
        return null;
      }

      @Override
      public Void caseFunctionType(FunctionType type) {
        emit("Function");
        return null;
      }
    }

    private class NamedTypePair implements Comparable<NamedTypePair> {
      private final String name;
      private final JSType type;

      NamedTypePair(JSType type, String name) {
        this.type = type;
        this.name = name;
      }

      @Override
      public int compareTo(NamedTypePair other) {
        int nameCmp = name.compareTo(other.name);
        if (nameCmp != 0) return nameCmp;
        return type.toString().compareTo(other.type.toString());
      }
    }
  }

  private boolean isFunctionPrototypeProp(String propName) {
    switch (propName) {
      case "apply":
      case "call":
      case "bind":
        return true;
      default:
        return false;
    }
  }

  private boolean isOrdinaryFunction(JSType ftype) {
    // Closure represents top-level functions as classes because they might be new-able.
    // This happens through externs es3.js which has Function marked as constructor.
    // See https://github.com/angular/closure-to-dts/issues/90
    boolean ordinaryFunctionAppearingAsClass =
        ftype.isConstructor() && "Function".equals(ftype.getDisplayName());
    return ftype.isOrdinaryFunction() || ordinaryFunctionAppearingAsClass;
  }

  private boolean isAliasedClassOrInterface(TypedVar symbol, JSType type) {
    // Confusingly typedefs are constructors. However, they cannot be aliased AFAICT.
    if (type.isNoType()) return false;
    if (!type.isConstructor() && !type.isInterface()) return false;
    String symbolName = symbol.getName();
    String typeName = type.getDisplayName();
    // Turns out that for aliases the symbol and type name differ.
    return !symbolName.equals(typeName) || KNOWN_CLASS_ALIASES.containsKey(symbolName);
  }

  private void emitSkipTypeAlias(TypedVar symbol) {
    emit(
        "/* skipped emitting type alias "
            + symbol.getName()
            + " to avoid collision with existing one in lib.d.ts. */");
  }
}

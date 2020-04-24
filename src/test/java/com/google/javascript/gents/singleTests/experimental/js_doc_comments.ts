

/* This is not a JSDoc commment. */

/*
 * This is not a JSDoc commment.
 */

/** This is a properly formatted, single-line JSDoc comment. */

/**
 * This is a properly formatted, multiline JSDoc comment.
 */

/** There's whitespace after this single-line JSDoc comment. */

/**There's no leading whitespace in this single-line JSDoc comment. */

/** There's no trailing whitespace in this single-line JSDoc comment.*/

/**There's no leading, trailing whitespace in this single-line JSDoc comment.*/

/**
 * There's whitespace after this multiline JSDoc comment.
 */

/**There's
 * no leading whitespace in this multiline JSDoc comment.
 */

/**
 * There's no trailing whitespace in this multiline JSDoc comment.
 */

/**There's
 * no leading or trailing whitespace in this multiline JSDoc comment.
 */

/**There's no leading or trailing
 * whitespace, nor linebreak in this multiline JSDoc comment.*/

/**
 * This is a really, really, really, really, long single-line JSDOc comment and
 * it wraps.
 */

/**
 * This is a really, really, really, really, long multiline JSDoc comment and it
 * wraps.
 */

/**
 * This JSDoc comment has a trailing, empty line.
 *
 */

/**
 * This JSDoc comment has a trailing, empty line, too. And it has trailing
 * whitespace.
 *
 */

/**
 * This JSDoc comment has an inner, empty line:
 *
 * See it? Up there.
 */

/**
 * This JSDoc comment has an inner, empty line, too. And it has trailing
 * whitespace.
 *
 * See it? Up there.
 */

/** This single-line JSDoc comment has an @ampersand in the first line. */

/**
 * This multiline JSDoc comment has an @ampersand in the first line.
 */

/**
 * This multiline JSDoc comment has an @ampersand in the first line, too.
 */

/** @param This single-line JSDoc has JSDoc annotatioon in first line. */

/**
 * @param This multiline JSDoc has JSDoc annotation in the first line.
 */

/**
 * The following @param annotation has no explanatory text and should go away.
 */

/**
 * This @return annotation has explanatory text on the same line and should
 * stick around. The type annotation should go away.
 * @return This is some explanatory text.
 */

/**
 * The last line isn't indented, so isn't explanatory text, and shouldn't move.
 * @return This is some explanatory text.
 * Don't move this line. It's just hanging out by itself.
 */

/**
 * This explanatory text starts on the same line as the JSDoc annotation, and
 * carries over to the next line, with minimal indentation.
 * @return This is some explanatory text.
 *  This is also some explanatory text.
 */

/**
 * This explanatory text starts on the same line as the JSDoc annotation, and
 * carries over to the next line, with non-minimal indentation.
 * @return This is some explanatory text.
 *   This is also some explanatory text.
 */

/**
 * This explanatory text starts on the same line as the JSDoc annotation, and
 * carries over to the next line, with minimal indentation.
 * @return This is some explanatory text.
 *  This is also some explanatory text.
 * Don't move this line. It's just hanging out by itself.
 */

/**
 * This explanatory text starts on the same line as the JSDoc annotation, and
 * carries over to the next line, with non-minimal indentation.
 * @return This is some explanatory text.
 *   This is also some explanatory text.
 * Don't move this line. It's just hanging out by itself.
 */

/**
 * This test has lots of JSDoc annotations
 * @param model This is some explanatory text.
 * Don't move this line. It's just hanging out by itself.
 * @return This is some more explanatory text.
 * Don't move this line, either. It's just hanging out by itself.
 */

/**
 * All these @type annotations with no explanatory text should be removed.
 */

/**
 * An object literal type annotation that spans multiple lines.
 * @param {{someverylongnaaaaaaaaaaaaaaaaaame: string,
 *       anotheraaaaaaaaaaaaaaaaaaaaaaaaaa: string}} foo Note: this test
 *   exhibits currently broken behavior in Gents. The type annotation should
 *   have been removed.
 */

/**
 * This JSDoc comment has an empty type annotation, identifier, no explanatory
 * explanatory text, and should go away.
 */

/**
 * @param {{someverylongnaaaaaaaaaaaaaaaaaame: string,
 *       anotheraaaaaaaaaaaaaaaaaaaaaaaaaa: string}} foo A broken up
 *   comment here. Note: this test exhibits currently broken behavior in
 *   Gents. The type annotation should have been removed.
 */

/*
 * @param {{}} This type annotation has an empty object literal.
 */

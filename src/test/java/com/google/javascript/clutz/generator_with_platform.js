goog.module('generators_total');

function* inferredG() {
    yield 0;
}

/** @return {!Generator<number>} */
function* typedG() {
    yield 0;
}

/**
 * @template T
 * @param {!Iterable<T>} iter
 * @return {!Generator<T>}
 */
function* templateG(iter) {
    for (const item of iter) {
        yield item;
    }
}


exports.inferredG = inferredG;
exports.typedG = typedG;
exports.templateG = templateG;
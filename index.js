'use strict';

/**
 * @param {boolean} expr
 * @return {boolean}
 */
var isTrue = (expr) => !!expr;

/**
 *
 * @param {*} value
 * @param {array|object} array
 * @return {boolean}
 */
var includes = (value, array) => array instanceof Array ? array.includes(value) : Object.values(array).includes(value);

/**
 *
 * @param {array|string|number|object|boolean|null|undefined} value
 * @return {boolean}
 */
var isEmpty = (value) => {
    if (
        value === null ||
        value === undefined ||
        value === false ||
        value === '' ||
        value === 0
    ) {
        return true;
    }

    if (value instanceof Array) {
        return value.length === 0;
    }

    if (value instanceof Object) {
        return Object.values(value).length === 0;
    }

    return false;
};

/**
 *
 * @param {*} value
 * @return {boolean}
 */
var isNil = (value) => value == null;

const validators = {
    isTrue,
    includes,
    isEmpty,
    isNil,
};

/**
 * @typedef {Object} AssertValidatorFunctions
 * @property {function} isTrue
 * @property {function} includes
 * @property {function} isEmpty
 * @property {function} isNil
 */

/**
 * @typedef {AssertValidatorFunctions} AssertFunction
 * @property {AssertValidatorFunctions} not
 */

/**
 *
 * @param {boolean} expr
 * @param {string|function} [message] or constructor
 * @param {number|function} [code] or constructor
 * @param {function} [constructor]
 */
function assertFunction(expr, message, code, constructor) {
    if (message instanceof Function) {
        constructor = message;
        message     = undefined;
    }

    if (code instanceof Function) {
        constructor = code;
        code        = undefined;
    }

    if (typeof code === 'string') {
        message = code;
        code    = undefined;
    }

    constructor = constructor || Error;

    if (Boolean(expr) === false) {
        throw new constructor(message || 'unknown assertion error', code);
    }
}

/** @type {AssertFunction} */
const assert = assertFunction;
assert.not   = {};

Object.entries(validators).forEach(([/** string */ key, /** function */ validator]) => {
    const test = (...args) => {
        const parameters = args.splice(0, validator.length);
        const expr       = !!validator(parameters);
        return {
            expr,
            args,
        };
    };

    assert[key]     = (...args) => {
        const result = test(...args);
        //noinspection JSCheckFunctionSignatures
        assert(result.expr, ...result.args);
    };
    assert.not[key] = (...args) => {
        const result = test(...args);
        //noinspection JSCheckFunctionSignatures
        assert(!result.expr, ...result.args);
    };
});

module.exports = assert;

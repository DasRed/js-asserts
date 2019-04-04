import hasKey from './lib/hasKey.js';
import includes from './lib/includes.js';
import isEmpty from './lib/isEmpty.js';
import isEqual from './lib/isEqual.js';
import isFalse from './lib/isFalse.js';
import isGreater from './lib/isGreater.js';
import isGreaterOrEqual from './lib/isGreaterOrEqual.js';
import isLess from './lib/isLess.js';
import isLessOrEqual from './lib/isLessOrEqual.js';
import isNil from './lib/isNil.js';
import isNull from './lib/isNull.js';
import isTrue from './lib/isTrue.js';
import isUndefined from './lib/isUndefined.js';

const validators = {
    hasKey,
    includes,
    isEmpty,
    isEqual,
    isFalse,
    isGreater,
    isGreaterOrEqual,
    isLess,
    isLessOrEqual,
    isNil,
    isNull,
    isTrue,
    isUndefined,
};

/**
 * @typedef {Object} AssertValidatorFunctions
 * @property {function} hasKey
 * @property {function} includes
 * @property {function} isEmpty
 * @property {function} isEqual
 * @property {function} isFalse
 * @property {function} isGreater
 * @property {function} isGreaterOrEqual
 * @property {function} isLess
 * @property {function} isLessOrEqual
 * @property {function} isNil
 * @property {function} isNull
 * @property {function} isTrue
 * @property {function} isUndefined
 */

/**
 * @typedef {AssertValidatorFunctions} AssertFunction
 * @property {AssertValidatorFunctions} not
 */

/**
 *
 * @param {boolean} expr
 * @param {string|function} [message] or constructor
 * @param {number|function|string} [code] or constructor
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
        const expr       = !!validator(...parameters);
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

export default assert;

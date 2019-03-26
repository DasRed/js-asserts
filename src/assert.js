import isTrue from './lib/isTrue.js';
import isFalse from './lib/isFalse.js';
import includes from './lib/includes.js';
import isEmpty from './lib/isEmpty.js';
import isNil from './lib/isNil.js';
import hasKey from './lib/hasKey.js';
import isEqual from './lib/isEqual.js';
import isGreaterOrEqual from './lib/isGreaterOrEqual.js';
import isGreater from './lib/isGreater.js';
import isLessOrEqual from './lib/isLessOrEqual.js';
import isLess from './lib/isLess.js';

const validators = {
    isTrue,
    isFalse,
    includes,
    isEmpty,
    isNil,
    hasKey,
    isEqual,
    isGreaterOrEqual,
    isGreater,
    isLessOrEqual,
    isLess,
};

/* *
 * @typedef {Object} AssertValidatorFunctions
 * @property {function} isTrue
 * @property {function} isFalse
 * @property {function} includes
 * @property {function} isEmpty
 * @property {function} isNil
 * @property {function} hasKey
 * @property {function} isEqual
 * @property {function} isGreaterOrEqual
 * @property {function} isGreater
 * @property {function} isLessOrEqual
 * @property {function} isLess
 */

/* *
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

/* * @type {AssertFunction} */
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

export default assert;

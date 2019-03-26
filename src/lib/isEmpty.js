/**
 *
 * @param {array|string|number|object|boolean|null|undefined} value
 * @return {boolean}
 */
export default (value) => {
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

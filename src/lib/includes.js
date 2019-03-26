/**
 *
 * @param {*} value
 * @param {array|object} array
 * @return {boolean}
 */
export default (value, array) => array instanceof Array ? array.includes(value) : Object.values(array).includes(value);

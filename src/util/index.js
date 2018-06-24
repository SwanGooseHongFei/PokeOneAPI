const utility = require('util');

/**
 * Abstract Util Class
 * @abstract
 */
class Util {
	/**
	 * Promisify a function
	 * @param {Function} functionToParse The function to promisify
	 * @returns {Function}
	 */
	static promisify(functionToParse) {
		return utility.promisify(functionToParse);
	}
}

module.exports = Util;

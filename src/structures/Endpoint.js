const Database = require('./Database');
const database = new Database();

/**
 * Represents an endpoint
 */
class Endpoint {
	constructor(options = {}) {
		/**
		 * The name of the endpoint
		 * @type {string}
		 */
		this.name = options.name;

		/**
		 * The description of the endpoint
		 * @type {string}
		 */
		this.description = options.description;

		/**
		 * The route of the endpoint
		 * @type {string}
		 */
		this.route = options.route;

		/**
		 * The database in use
		 * @type {Database}
		 */
		this.database = database;

		/**
		 * Whether or not the endpoint is admin only
		 * @type {boolean}
		 * @default [true]
		 */
		this.admin = options.admin || false;

		if (!this.name) throw new Error('Endpoint requires a name');
		if (!this.description) throw new Error('Endpoint requires a description');
		if (!this.route) throw new Error('Endpoint requires a route');

		if (typeof this.name !== 'string') throw new TypeError('Endpoint name must be a string');
		if (typeof this.description !== 'string') throw new TypeError('Endpoint description must be a string');
		if (typeof this.route !== 'string') throw new TypeError('Endpoint route must be a string');
		if (typeof this.admin !== 'boolean') throw new TypeError('Endpoint admin property must be a boolean');
	}

	/**
	 * Method to check Authorization
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 * @param {?boolean} [methodAdminOnly = false] defines if this method is admin only
	 * @returns {Promise<boolean>}
	 */
	async checkAuth(req, res, methodAdminOnly = false) {
		const auth = req.header('Authorization', null);
		console.log(auth);
		if (!auth) {
			this.missingAuth(req, res);
			return false;
		}
		const result = await this.database.users.find(
			{ where: { token: auth } }
		);
		if (!result) {
			this.missingAuth(req, res);
			return false;
		}
		if (methodAdminOnly && !result.isAdmin) {
			this.missingPermission(req, res);
			return false;
		}
		return true;
	}

	/**
	 * Method to call on missing Authorization
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 */
	missingAuth(req, res) {
		res.json(401, { status: 401, message: 'Unauthorized' });
		res.end();
	}

	/**
	 * Method to call on missing Permission
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 */
	missingPermission(req, res) {
		res.json(403, { status: 403, message: 'Forbidden' });
		res.end();
	}

	/**
	 * Method to call on internal Server Errors
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 * @param {Error} error The error message to display
	 */
	internalError(req, res, error) {
		res.json(500, { status: 500, message: 'Internal Server Error', error: error.message });
		res.end();
	}

	/**
	 * Method to call on bad Requests
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 * @param {?string} error The error message to display
	 */
	badRequest(req, res, error = 'Error') {
		res.json(400, {
			status: 400,
			message: 'Bad Request',
			error
		});
		res.end();
	}

	/**
	 * Method to call on unfound Requests
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 * @param {?string} error The error message to display
	 */
	notFound(req, res, error = 'Error') {
		res.json(404, {
			status: 404,
			message: 'Not Found',
			error
		});
		res.end();
	}

	/**
	 * Method to call on success
	 * @param {Request} req Request to handle
	 * @param {Response} res Response to send
	 * @param {Object} responseData Data that we send in the JSON response
	 */
	success(req, res, responseData) {
		res.json(200, responseData);
		res.end();
	}
}

module.exports = Endpoint;

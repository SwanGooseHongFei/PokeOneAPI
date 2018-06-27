const Endpoint = require('../../Structures/Endpoint');
const fs = require('fs');
const path = require('path');

/**
 * Status Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @property {number} version
 * @extends {Endpoint}
 */
class StatusEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Status',
			description: 'Returns information about the server status',
			route: 'status',
			version: 1
		});
	}

	/**
	 * Get respond on the request
	 * @param {Request} req The request
	 * @param {Response} res The response
	 * @async
	 * @returns {void}
	 */
	async get(req, res) {
		if (!await this.checkAuth(req, res)) return true;

		let statusPath = './data/status';
		try {
			let statusObject = {};
			const files = fs.readdirSync(statusPath);
			files.forEach(file => {
				let filePath = path.join(statusPath, file);
				if (fs.statSync(filePath).isDirectory()) return;

				const status = JSON.parse(fs.readFileSync(filePath));

				statusObject[file.replace(/\.\S+/, '')] = status;
			});

			return this.success(req, res, statusObject);
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = StatusEndpoint;

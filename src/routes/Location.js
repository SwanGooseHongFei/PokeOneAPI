const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Location Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class LocationEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Location',
			description: 'Returns information of a specific Location',
			route: '/location/:search'
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
		try {
			if (!req.params.search) return this.badRequest(req, res);
			const locationData = req.params.search;

			if (fs.existsSync('./data/ingame/location.json')) {
				const locationInfo = JSON.parse(fs.readFileSync('./data/ingame/location.json'));

				if (locationInfo[locationData]) {
					return this.success(req, res, {
						status: '200',
						search: locationData,
						info: locationInfo[locationData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find location ${locationData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = LocationEndpoint;

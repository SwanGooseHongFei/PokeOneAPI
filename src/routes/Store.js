const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Store Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class StoreEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Store',
			description: 'Returns information of a specific Store',
			route: '/store/:search'
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
			const p1StoreData = req.params.search;

			if (fs.existsSync('./data/ingame/store.json')) {
				const p1StoreInfo = JSON.parse(fs.readFileSync('./data/ingame/store.json'));

				if (p1StoreInfo[p1StoreData]) {
					return this.success(req, res, {
						search: p1StoreData,
						data: p1StoreInfo[p1StoreData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find ${p1StoreData}`);
				}
			} else {
				return this.badRequest(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = StoreEndpoint;

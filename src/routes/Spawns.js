const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Spawns Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class SpawnsEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Spawns',
			description: 'Returns information of a specific Spawn',
			route: '/spawns/:search'
		});
	}

	/**
	 * Get respond on the request
	 * @param {Request} req The request
	 * @param {Response} res The response
	 * @async
	 * @returns {void}
	 */
	get(req, res) {
		try {
			if (!req.params.search) return this.badRequest(req, res);
			const spawnsData = req.params.search;

			if (fs.existsSync('./data/ingame/spawns.json')) {
				const SpawnsInfo = JSON.parse(fs.readFileSync('./data/ingame/spawns.json'));

				if (SpawnsInfo[spawnsData]) {
					return this.success(req, res, {
						status: '200',
						search: spawnsData,
						data: SpawnsInfo[spawnsData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find spawn ${spawnsData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = SpawnsEndpoint;

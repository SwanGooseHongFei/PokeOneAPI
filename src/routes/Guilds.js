const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Guilds Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class GuildsEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Guilds',
			description: 'Returns information of a specific Guild',
			route: '/guilds/:search'
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
			const guildsData = req.params.search;

			if (fs.existsSync('./data/ingame/guilds.json')) {
				const guildsInfo = JSON.parse(fs.readFileSync('./data/ingame/guilds.json'));

				if (guildsInfo[guildsData]) {
					return this.success(req, res, {
						status: '200',
						search: guildsData,
						data: guildsInfo[guildsData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find guild ${guildsData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = GuildsEndpoint;

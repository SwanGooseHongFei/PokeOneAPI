const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Move Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class MoveEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Moves',
			description: 'Returns information of a specific Move',
			route: '/moves/:search'
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
			const moveData = req.params.move;

			if (fs.existsSync(`./data/moves/${req.params.search.toLowerCase()}.json`)) {
				const moveInfo = JSON.parse(fs.readFileSync(`./data/moves/${req.params.search.toLowerCase()}.json`));

				if (moveInfo) {
					return this.success(req, res, {
						status: '200',
						search: moveData,
						info: moveInfo
					});
				} else {
					return this.notFound(req, res, `Couldn't find move ${moveData}`);
				}
			} else {
				return this.notFound(req, res);
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = MoveEndpoint;

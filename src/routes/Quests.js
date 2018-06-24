const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Quests Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class QuestsEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Quests',
			description: 'Returns information of a specific Quest',
			route: '/quests/:search'
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
			const p1QuestsData = req.params.search;

			if (fs.existsSync('./data/ingame/quests.json')) {
				const p1QuestsInfo = JSON.parse(fs.readFileSync('./data/ingame/quests.json'));

				if (p1QuestsInfo[p1QuestsData]) {
					return this.success(req, res, {
						status: '200',
						search: p1QuestsData,
						data: p1QuestsInfo[p1QuestsData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find quest ${p1QuestsData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = QuestsEndpoint;

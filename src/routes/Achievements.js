const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Achievements Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class AchievementsEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Achievemnts',
			description: 'Returns information of a specific Achievement',
			route: '/achievements/:search'
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
			const p1AchievementsData = req.params.search;

			if (fs.existsSync('./data/ingame/achievements.json')) {
				const p1AchievementsInfo = JSON.parse(fs.readFileSync('./data/ingame/achievements.json'));

				if (p1AchievementsInfo[p1AchievementsData]) {
					return this.success(req, res, {
						status: '200',
						search: p1AchievementsData,
						data: p1AchievementsInfo[p1AchievementsData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find achievement ${p1AchievementsData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = AchievementsEndpoint;

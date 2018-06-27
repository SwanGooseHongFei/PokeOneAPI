const Endpoint = require('../../Structures/Endpoint');
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
			name: 'Ability',
			description: 'Returns information of a specific Ability',
			route: 'ability/:search',
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
		try {
			if (!req.params.search) return this.badRequest(req, res);
			const abilityData = req.params.search;

			if (fs.existsSync('./data/abilities/ability.json')) {
				const abilityInfo = JSON.parse(fs.readFileSync('./data/abilities/ability.json'));

				if (abilityInfo[abilityData]) {
					return this.success(req, res, {
						status: '200',
						search: abilityData,
						info: abilityInfo[abilityData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find ability ${abilityData}`);
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

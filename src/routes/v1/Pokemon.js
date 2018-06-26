const Endpoint = require('../../Structures/Endpoint');
const fs = require('fs');

/**
 * Pokemon Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class PokemonEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Pokemon',
			description: 'Returns information of a specific Pokemon',
			route: 'pokemon/:search',
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
			if (!req.params.search) return this.badRequest();
			const pokeData = req.params.search;

			if (fs.existsSync(`./data/pokemon/${req.params.search.toLowerCase()}.json`)) {
				const pokesInfo = JSON.parse(fs.readFileSync(`./data/pokemon/${req.params.search.toLowerCase()}.json`));

				if (pokesInfo) {
					return this.success(req, res, {
						status: '200',
						search: pokeData,
						info: pokesInfo
					});
				} else {
					return this.notFound(req, res, `Couldn't find ${pokeData} in database.`);
				}
			} else {
				return this.notFound(req, res, `Couldn't find ${pokeData} in database.`);
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = PokemonEndpoint;

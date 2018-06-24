const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Types Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class TypesEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Types',
			description: 'Returns information of a specific Type',
			route: '/types/:search'
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
			const typesData = req.params.search;

			if (fs.existsSync('./data/types/types.json')) {
				const typesInfo = JSON.parse(fs.readFileSync('./data/types/types.json'));

				if (typesInfo[typesData]) {
					return this.success(req, res, {
						status: '200',
						search: typesData,
						info: typesInfo[typesData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find type ${typesData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = TypesEndpoint;

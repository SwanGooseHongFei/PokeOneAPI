const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Natures Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class NaturesEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Nature',
			description: 'Returns information of a specific Nature',
			route: '/nature/:search'
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
			const natureData = req.params.search;

			if (fs.existsSync('./data/nature/nature.json')) {
				const natureInfo = JSON.parse(fs.readFileSync('./data/nature/nature.json'));

				if (natureInfo[natureData]) {
					return this.success(req, res, {
						status: '200',
						search: natureData,
						data: natureInfo[natureData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find nature ${natureData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = NaturesEndpoint;

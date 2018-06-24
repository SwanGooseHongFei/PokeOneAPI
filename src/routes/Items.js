const Endpoint = require('../Structures/Endpoint');
const fs = require('fs');

/**
 * Item Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class ItemEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'Items',
			description: 'Returns information of a specific Item',
			route: '/items/:search'
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
			const itemsData = req.params.search;

			if (fs.existsSync(`./data/items/items.json`)) {
				const itemsInfo = JSON.parse(fs.readFileSync('./data/items/items.json'));

				if (itemsInfo[itemsData]) {
					return this.success(req, res, {
						status: '200',
						search: itemsData,
						data: itemsInfo[itemsData]
					});
				} else {
					return this.notFound(req, res, `Couldn't find item ${itemsData}`);
				}
			} else {
				return this.notFound(req, res, 'File not found on disk');
			}
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}
}

module.exports = ItemEndpoint;

const fs = require('fs');
const { promisify } = require('../util');
const path = require('path');
const bodyParser = require('body-parser');
const readDirAsync = promisify(fs.readdir);
const restify = require('restify');

/**
 * Class to instance the Restify Server
 * @param {Server} server Restify server to use
 */
class APIServer {
	constructor(server) {
		/**
		 * This server
		 * @type {Server}
		 */
		this.server = server.createServer();

		this.disabledRoutes = ['TimeEvents'];

		this.server.use(bodyParser.json());
		this.server.use(bodyParser.urlencoded({ extended: false }));

		// Time windows in seconds
		const timeWindow = 1;
		// Amount of API calls per time window
		const callsPerWindow = 1;

		this.server.use(restify.plugins.throttle({
			burst: callsPerWindow / timeWindow,
			rate: callsPerWindow / timeWindow,
			ip: true
		}));

		/**
		 * The set of route this server uses
		 * @type {Set}
		 */
		this.routes = new Set();
		this.loadRoutes(path.join(__dirname, '../routes'));

		this.server.get('/pokemon/*', restify.plugins.serveStatic({
			directory: './pokemon',
			default: 'index.html',
			appendRequestPath: false
		}));
		this.server.get('/home/*', restify.plugins.serveStatic({
			directory: './home',
			default: 'index.html',
			appendRequestPath: false
		}));
	}

	/**
	 * Load all routes of the API
	 * @param {string} dir The directory to load routes from
	 */
	async loadRoutes(dir) {
		const files = await readDirAsync(dir);
		files.forEach(file => {
			if (this.disabledRoutes.includes(file.slice(0, -3))) return;
			file = path.join(dir, file);
			const endpoint = new (require(file))();
			this.routes.add(endpoint);

			this.server.get(`/v1${endpoint.route}`, endpoint.get ? endpoint.get.bind(endpoint) : this.notAllowed);
			this.server.post(`/v1${endpoint.route}`, endpoint.post ? endpoint.post.bind(endpoint) : this.notAllowed);
			this.server.patch(`/v1${endpoint.route}`, endpoint.patch ? endpoint.patch.bind(endpoint) : this.notAllowed);
			this.server.del(`/v1${endpoint.route}`, endpoint.delete ? endpoint.delete.bind(endpoint) : this.notAllowed);
		});
	}

	/**
	 * Method to call
	 * @param {number} port Port to listen on
	 * @param {string} comment The comment to display when connected
	 */
	listen(port, comment) {
		this.server.listen(port, console.log(comment));
	}

	/**
	 * Method to call on not allowed requests
	 * @param {Request} req The request
	 * @param {Response} res The response
	 */
	notAllowed(req, res) {
		res.status(405).json({ status: 405, message: 'Method Not Allowed' });
		res.end();
	}
}

module.exports = APIServer;

const fs = require('fs');
const { promisify } = require('../util');
const path = require('path');
const bodyParser = require('body-parser');
const readDirAsync = promisify(fs.readdir);
const restify = require('restify');
const StatusChecker = require('./StatusChecker');

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

		this.disabledRoutes = [];

		this.server.use(bodyParser.json());
		this.server.use(bodyParser.urlencoded({ extended: false }));

		const { rateList } = require('../../config.json');

		this.limiterList = {};

		for (const rate in rateList) {
			const actualRate = rateList[rate].callsPerWindow / rateList[rate].timeWindow;
			console.log(actualRate);
			this.limiterList[rate] = restify.plugins.throttle({
				burst: actualRate < 1 ? 1 : Math.floor(actualRate),
				rate: actualRate,
				ip: true,
				setHeaders: true
			});
		}

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

		/**
		 * Statuschecker list
		 * @type {StatusChecker[]}
		 */
		this.statusChecker = {};

		this.statusChecker.server = new StatusChecker({
			ip: '95.183.48.4',
			port: 2012,
			name: 'server'
		});

		this.statusChecker.website = new StatusChecker({
			ip: 'poke.one',
			port: 80,
			name: 'website'
		});

		for (const checker in this.statusChecker) {
			this.statusChecker[checker].check();
			setInterval(() => this.statusChecker[checker].check(), 1 * 60 * 1000);
		}
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
			if (fs.statSync(file).isDirectory()) {
				this.loadRoutes(file);
				return;
			}
			const endpoint = new (require(file))();
			this.routes.add(endpoint);

			for (const type in this.limiterList) {
				this.server.get(`/${type}/v${endpoint.version}/${endpoint.route}`,
					this.limiterList[type], endpoint.get ? endpoint.get.bind(endpoint) : this.notAllowed);
				this.server.post(`/${type}/v${endpoint.version}/${endpoint.route}`,
					this.limiterList[type], endpoint.post ? endpoint.post.bind(endpoint) : this.notAllowed);
				this.server.patch(`/${type}/v${endpoint.version}/${endpoint.route}`,
					this.limiterList[type], endpoint.patch ? endpoint.patch.bind(endpoint) : this.notAllowed);
				this.server.del(`/${type}/v${endpoint.version}/${endpoint.route}`,
					this.limiterList[type], endpoint.delete ? endpoint.delete.bind(endpoint) : this.notAllowed);
			}
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

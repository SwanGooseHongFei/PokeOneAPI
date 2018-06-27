const net = require('net');
const fs = require('fs');

/**
 * StatusChecker class
 */
class StatusChecker {
	constructor(data) {
		/**
		 * The IP to check
		 * @type {string}
		 */
		this.ip = data.ip || '127.0.0.1';

		/**
		 * The port to check
		 * @type {number}
		 */
		this.port = data.port || 8080;

		this.name = data.name;

		if (!this.name) throw new Error('StatusChecker requires a name');

		if (typeof this.ip !== 'string') throw new TypeError('StatusChecker IP needs to be a string');
		if (typeof this.port !== 'number') throw new TypeError('StatusChecker Port needs to be a number');
		if (typeof this.name !== 'string') throw new TypeError('StatusChecker Name needs to be a string');
	}

	/**
	 * Initiates a check and writes to the file
	 * @returns {void}
	 */
	check() {
		this.checkConnection()
			.then(() => {
				this.writeStatus(true);
			})
			.catch(() => {
				this.writeStatus(false);
			});
	}

	/**
	 * Connection function returns a promise that resolves on connect and rejects otherwise
	 * @returns {Promise<boolean>}
	 */
	checkConnection() {
		return new Promise((resolve, reject) => {
			const timeout = 10000;
			const timer = setTimeout(() => {
				reject(new Error('Timedout'));
				socket.end();
			}, timeout);
			const socket = net.createConnection(this.port, this.ip, () => {
				clearTimeout(timer);
				resolve(true);
				socket.end();
			});
			socket.on('error', err => {
				clearTimeout(timer);
				reject(err);
			});
		});
	}

	/**
	 * Writes the status of the gameserver to a file
	 * @param {boolean} status True if reachable and false if unreachable
	 */
	writeStatus(status) {
		const stream = fs.createWriteStream(`./data/status/${this.name}.json`, { flag: 'w+' });
		stream.write(JSON.stringify({
			reachable: status
		}));
		stream.end();
	}
}

module.exports = StatusChecker;

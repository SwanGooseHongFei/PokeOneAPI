const Sequelize = require('sequelize');

class Database {
	constructor() {
		this.connection = new Sequelize('pokeone', null, null, {
			dialect: 'sqlite',
			storage: '../../accounts.sqlite3'
		});

		this.users = this.connection.define('user', {
			username: {
				type: Sequelize.TEXT,
				unique: true,
				allowNull: false,
				primaryKey: true
			},
			password: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			token: {
				type: Sequelize.TEXT,
				unique: true,
				allowNull: false
			}
		});

		this.connection.sync();
	}
}

module.exports = Database;

/* eslint-disable complexity */

const Endpoint = require('../../Structures/Endpoint');
const moment = require('moment');

/**
 * TimeEventsEndpoint Endpoint
 * @property {string} name
 * @property {string} description
 * @property {string} route
 * @extends {Endpoint}
 */
class TimeEventsEndpoint extends Endpoint {
	constructor() {
		super({
			name: 'TimeEvents',
			description: 'Returns information about all time based events',
			route: 'timeevents',
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
			// Setting it to use the servers timezone of UTC-10
			const now = moment().utcOffset('-1000');

			// Daily reset
			const dailyReset = this.difference(now, now.day() + 1);

			// Bugcontest is on: saturday, monday, thursday
			const bugContest = [1, 4, 6].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 1 ? 1 : now.day() < 4 ? 4 : now.day() < 6 ? 6 : 8);

			// Lake of Rage is on: wednesday
			const LakeofRage = now.day() === 3 ? 'Now' : this.difference(now, 3);

			// Lapras event is on: friday
			const laprasEvent = now.day() === 5 ? 'Now' : this.difference(now, 5);

			// To olivine is on: tuesday, thursday, sunday
			const toOlivine = [2, 4, 6].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 2 ? 2 : now.day() < 4 ? 4 : now.day() < 6 ? 6 : 9);

			// To vermillion is on: monday, wednesday, friday
			const toVermilion = [1, 3, 5].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 1 ? 1 : now.day() < 3 ? 3 : now.day() < 5 ? 5 : 8);

			// MooMoo farm is on: sunday and wednesday
			const moomoo = [0, 3].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 3 ? 3 : 7);

			// Old Brother is on: tuesday, thursday, saturday
			const oldBrother = [2, 4, 6].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 2 ? 2 : now.day() < 4 ? 4 : now.day() < 6 ? 6 : 9);

			// Young Brother is on: monday, wednesday, friday
			const youngBrother = [1, 3, 5].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 1 ? 1 : now.day() < 3 ? 3 : now.day() < 5 ? 5 : 8);

			// Herb is on: saturday and sunday
			const herb = [0, 6].includes(now.day()) ? 'Now' :
				this.difference(now, now.day() < 6 ? 6 : 7);

			const today = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.day()];

			const sunny = now.day() === 0 ? 'Now' : this.difference(now, 7);

			const monica = now.day() === 1 ? 'Now' : this.difference(now, now.day() < 1 ? 1 : 8);

			const tuscany = now.day() === 2 ? 'Now' : this.difference(now, now.day() < 2 ? 2 : 9);

			const wesley = now.day() === 3 ? 'Now' : this.difference(now, now.day() < 3 ? 3 : 10);

			const arthur = now.day() === 4 ? 'Now' : this.difference(now, now.day() < 4 ? 4 : 11);

			const frieda = now.day() === 5 ? 'Now' : this.difference(now, now.day() < 5 ? 5 : 12);

			const santos = now.day() === 6 ? 'Now' : this.difference(now, now.day() < 6 ? 6 : 13);

			return this.success(req, res, {
				dailyReset: dailyReset,
				bug: bugContest,
				rage: LakeofRage,
				unioncaveb2f: laprasEvent,
				olivine: toOlivine,
				vermilion: toVermilion,
				moomoofarm: moomoo,
				hairdresser1: oldBrother,
				hairdresser2: youngBrother,
				herbshop: herb,
				mon: monica,
				tue: tuscany,
				wed: wesley,
				thur: arthur,
				fri: frieda,
				sat: santos,
				sun: sunny,
				day: today
			});
		} catch (error) {
			return this.internalError(req, res, error);
		}
	}

	/**
	 * Calculates how long it is till reset
	 * @param {moment.Moment} now Time of now
	 * @param {number} day The day to skip to
	 * @returns {string} Difference in format of hh:mm:ss
	 */
	difference(now, day) {
		const reset = moment.duration(moment().utcOffset('-1000').days(day)
			.hours(0)
			.minutes(0)
			.diff(now));

		return reset.days() >= 1 ? `in ${reset.days() + 1}day${reset.days() === 1 ? '' : 's'}` :
			`in ${reset.hours()}h:${reset.minutes()}m:${reset.seconds()}s`;
	}
}

module.exports = TimeEventsEndpoint;

const Endpoint = require('../Structures/Endpoint');
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
			route: '/timevents'
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
			var reply;
			var bugContest;
			var LakeofRage;
			var laprasEvent;
			var toOlivine;
			var toVermilion;
			var moomoo;
			var mtmoon;
			var oldbrother;
			var youngbrother;
			var herb;
			var monica; //monday
			var tuscany; //tuesday
			var wesley; //wednesday
			var arthur; //thursday
			var frieda; //friday
			var santos; //saturday
			var sunny; //sunday
			var mountMoon;

			// already added
			const now = moment();

			// Reset
			const reset = moment.duration(now.add(now.hour <= 10 && now.minute() <= 3 ? 0 : 1, 'days')
				.hours(10)
				.minutes(3)
				.diff(now));


			const bugContest = now.day() === 0 && now.hour() < 10 ? 'Now' : this.difference(now, 1);

			if (moment().day() == "0") {
				if (moment().hour() < "10") {
					bugContest = "Now"
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = "Now"
					toVermilion = moment().day(1).hour(10).minute(03).fromNow()
					moomoo = moment().day(0).hour(10).minute(03).fromNow()
					oldbrother = "Now"
					youngbrother = moment().day(0).hour(10).minute(03).fromNow()
					herb = "Now"
					monica = moment().day(1).hour(10).minute(03).fromNow()
					tuscany = moment().day(2).hour(10).minute(03).fromNow()
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = "Now"
					sunny = moment().day(0).hour(10).minute(03).fromNow()
					today = "Saturday"

				} else {
					bugContest = moment().day(1).hour(10).minute(03).fromNow()
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = moment().day(2).hour(10).minute(03).fromNow()
					toVermilion = moment().day(1).hour(10).minute(03).fromNow()
					moomoo = "Now"
					oldbrother = moment().day(2).hour(10).minute(03).fromNow()
					youngbrother = "Now"
					herb = "Now"
					monica = moment().day(1).hour(10).minute(03).fromNow()
					tuscany = moment().day(2).hour(10).minute(03).fromNow()
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = "Now"
					today = "Sunday"

				}
			} else
			if (moment().day() == "1") {
				if (moment().hour() < "10") {
					bugContest = moment().day(1).hour(10).minute(03).fromNow()
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = moment().day(2).hour(10).minute(03).fromNow()
					toVermilion = moment().day(1).hour(10).minute(03).fromNow()
					moomoo = "Now"
					oldbrother = moment().day(2).hour(10).minute(03).fromNow()
					youngbrother = "Now"
					herb = "Now"
					monica = moment().day(1).hour(10).minute(03).fromNow()
					tuscany = moment().day(2).hour(10).minute(03).fromNow()
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = "Now"
					today = "Sunday"

				} else {
					bugContest = "Now"
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = moment().day(2).hour(10).minute(03).fromNow()
					moomoo = moment().day(3).hour(10).minute(03).fromNow()
					toVermilion = "Now"
					oldbrother = moment().day(2).hour(10).minute(03).fromNow()
					youngbrother = moment().day(3).hour(10).minute(03).fromNow()
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = "Now"
					tuscany = moment().day(2).hour(10).minute(03).fromNow()
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Monday"

				}
			} else
			if (moment().day() == "2") {
				if (moment().hour() < "10") {
					bugContest = "Now"
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = moment().day(2).hour(10).minute(03).fromNow()
					toVermilion = "Now"
					moomoo = moment().day(3).hour(10).minute(03).fromNow()
					oldbrother = moment().day(2).hour(10).minute(03).fromNow()
					youngbrother = moment().day(3).hour(10).minute(03).fromNow()
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = "Now"
					tuscany = moment().day(2).hour(10).minute(03).fromNow()
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Monday"
				} else {
					bugContest = moment().day(4).hour(10).minute(03).fromNow()
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = "Now"
					toVermilion = moment().day(3).hour(10).minute(03).fromNow()
					moomoo = moment().day(3).hour(10).minute(03).fromNow()
					oldbrother = "Now"
					youngbrother = moment().day(3).hour(10).minute(03).fromNow()
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = "Now"
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Tuesday"

				}
			} else
			if (moment().day() == "3") {
				if (moment().hour() < "10") {
					bugContest = moment().day(4).hour(10).minute(03).fromNow()
					LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = "Now"
					toVermilion = moment().day(3).hour(10).minute(03).fromNow()
					moomoo = moment().day(3).hour(10).minute(03).fromNow()
					oldbrother = "Now"
					youngbrother = moment().day(3).hour(10).minute(03).fromNow()
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = "Now"
					wesley = moment().day(3).hour(10).minute(03).fromNow()
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Tuesday"

				} else {
					bugContest = moment().day(4).hour(10).minute(03).fromNow()
					LakeofRage = "Now"
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = moment().day(4).hour(10).minute(03).fromNow()
					toVermilion = "Now"
					moomoo = "Now"
					oldbrother = moment().day(4).hour(10).minute(03).fromNow()
					youngbrother = "Now"
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = "Now"
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Wednesday"

				}
			} else
			if (moment().day() == "4") {
				if (moment().hour() < "10") {
					bugContest = moment().day(4).hour(10).minute(03).fromNow()
					LakeofRage = "Now"
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = moment().day(4).hour(10).minute(03).fromNow()
					toVermilion = "Now"
					moomoo = "Now"
					oldbrother = moment().day(4).hour(10).minute(03).fromNow()
					youngbrother = "Now"
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = "Now"
					arthur = moment().day(4).hour(10).minute(03).fromNow()
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Wednesday"

				} else {
					bugContest = "Now"
					LakeofRage = moment().day(10).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = "Now"
					toVermilion = moment().day(5).hour(10).minute(03).fromNow()
					moomoo = moment().day(7).hour(10).minute(03).fromNow()
					oldbrother = "Now"
					youngbrother = moment().day(5).hour(10).minute(03).fromNow()
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = moment().day(10).hour(10).minute(03).fromNow()
					arthur = "Now"
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Thursday"

				}
			} else
			if (moment().day() == "5") {
				if (moment().hour() < "10") {
					bugContest = "Now"
					LakeofRage = moment().day(10).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
					toOlivine = "Now"
					toVermilion = moment().day(5).hour(10).minute(03).fromNow()
					moomoo = moment().day(7).hour(10).minute(03).fromNow()
					oldbrother = "Now"
					youngbrother = moment().day(5).hour(10).minute(03).fromNow()
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = moment().day(10).hour(10).minute(03).fromNow()
					arthur = "Now"
					frieda = moment().day(5).hour(10).minute(03).fromNow()
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Thursday"

				} else {
					bugContest = moment().day(6).hour(10).minute(03).fromNow()
					LakeofRage = moment().day(10).hour(10).minute(03).fromNow()
					laprasEvent = "Now"
					toOlivine = moment().day(6).hour(10).minute(03).fromNow()
					toVermilion = "Now"
					moomoo = moment().day(7).hour(10).minute(03).fromNow()
					oldbrother = moment().day(6).hour(10).minute(03).fromNow()
					youngbrother = "Now"
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = moment().day(10).hour(10).minute(03).fromNow()
					arthur = moment().day(11).hour(10).minute(03).fromNow()
					frieda = "Now"
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Friday"

				}
			} else
			if (moment().day() == "6") {
				if (moment().hour() < "10") {
					bugContest = moment().day(6).hour(10).minute(03).fromNow()
					LakeofRage = moment().day(10).hour(10).minute(03).fromNow()
					laprasEvent = "Now"
					toOlivine = moment().day(6).hour(10).minute(03).fromNow()
					toVermilion = "Now"
					moomoo = moment().day(7).hour(10).minute(03).fromNow()
					oldbrother = moment().day(6).hour(10).minute(03).fromNow()
					youngbrother = "Now"
					herb = moment().day(6).hour(10).minute(03).fromNow()
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = moment().day(10).hour(10).minute(03).fromNow()
					arthur = moment().day(11).hour(10).minute(03).fromNow()
					frieda = "Now"
					santos = moment().day(6).hour(10).minute(03).fromNow()
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Friday"

				} else {
					bugContest = "Now"
					LakeofRage = moment().day(10).hour(10).minute(03).fromNow()
					laprasEvent = moment().day(12).hour(10).minute(03).fromNow()
					toOlivine = "Now"
					toVermilion = moment().day(8).hour(10).minute(03).fromNow()
					moomoo = moment().day(7).hour(10).minute(03).fromNow()
					oldbrother = "Now"
					youngbrother = moment().day(7).hour(10).minute(03).fromNow()
					herb = "Now"
					monica = moment().day(8).hour(10).minute(03).fromNow()
					tuscany = moment().day(9).hour(10).minute(03).fromNow()
					wesley = moment().day(10).hour(10).minute(03).fromNow()
					arthur = moment().day(11).hour(10).minute(03).fromNow()
					frieda = moment().day(12).hour(10).minute(03).fromNow()
					santos = "Now"
					sunny = moment().day(7).hour(10).minute(03).fromNow()
					today = "Saturday"

				}
			}

			reply = {
				dailyReset: reset,
				bug: bugContest,
				rage: LakeofRage,
				unioncaveb2f: laprasEvent,
				olivine: toOlivine,
				vermilion: toVermilion,
				moomoofarm: moomoo,
				hairdresser1: oldbrother,
				hairdresser2: youngbrother,
				herbshop: herb,
				mon: monica,
				tue: tuscany,
				wed: wesley,
				thur: arthur,
				fri: frieda,
				sat: santos,
				sun: sunny,
				day: today
			};
			response.send(reply)

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
		const reset = moment.duration(now.days(now.hour <= 10 && now.minute() <= 3 ? 0 : day)
				.hours(10)
				.minutes(3)
				.diff(now));

		return `in ${reset.hour()}h:${reset.minute()}m:${reset.seconds()}s`;
	}
}

module.exports = TimeEventsEndpoint;
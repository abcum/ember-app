import Service from '@ember/service';
import Poller from '../classes/poller';

export default Service.extend({

	ticker: null,
	year: null,
	month: null,
	day: null,
	hour: null,
	minute: null,
	second: null,
	quart: null,

	init() {

		this._super(...arguments);

		this.poller = new Poller(1000);

		this.poller.start(this, this.tick);

	},

	willDestroy() {

		this.poller.clear();

		this._super(...arguments);

	},

	tick() {

		const date = new Date();

		this.setProperties({
			full: date,
			year: date.getFullYear(),
			month: date.getMonth(),
			day: date.getDate(),
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds(),
			quart: Math.ceil( date.getSeconds() / 15 ),
		});

	},

});

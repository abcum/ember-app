import Service from '@ember/service';
import { later } from '@ember/runloop';

export default Service.extend({

	year: null,
	month: null,
	day: null,
	hour: null,
	minute: null,
	second: null,
	quart: null,

	init() {

		this._super(...arguments);

		this.tick();

	},

	tick() {

		let date = new Date();

		this.setProperties({
			year: date.getFullYear(),
			month: date.getMonth(),
			day: date.getDate(),
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds(),
			quart: Math.ceil( date.getSeconds() / 15 ),
		});

		later(this, this.tick, 1000);

	},

});

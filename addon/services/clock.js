import Service from '@ember/service';

const FREQUENCY = 1000;

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

		this.ticker = setInterval(
			this.tick.bind(this),
			FREQUENCY,
		);

		this.tick();

	},

	willDestroy() {

		clearInterval(this.ticker);

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

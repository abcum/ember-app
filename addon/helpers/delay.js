import Helper from '@ember/component/helper';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default Helper.extend({

	compute([ wait = 0 ]) {

		if (!wait) return Promise.resolve();

		return new Promise(resolve => {
			later(this, () => resolve(wait), wait);
		});
	},

});

import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { inject } from '@ember/service';
import Moment from 'moment';

export default Helper.extend({

	clock: inject(),

	changed: observer('clock.quart', function() {
		this.recompute();
	}),

	compute([ value = undefined, c = undefined, t = undefined ], { options = undefined }) {
		if (options) {
			return Moment(value).add( Object.assign({}, options) );
		} else {
			return Moment(value).add(c, t);
		}
	}

});

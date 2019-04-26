import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { inject } from '@ember/service';
import Moment from 'moment';

export default Helper.extend({

	clock: inject(),

	changed: observer('clock.quart', function() {
		this.recompute();
	}),

	compute([ value = undefined, reference = undefined ], { format = undefined }) {
		return Moment(value).calendar(reference, format);
	}

});

import Helper from '@ember/component/helper';
import Moment from 'moment';

export default Helper.extend({

	compute([ value = undefined ]) {
		return Moment(value);
	}

});

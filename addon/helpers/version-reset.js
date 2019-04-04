import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

	version: inject(),

	compute() {
		return function() {
			return this.get('version').reset();
		};
	}

});

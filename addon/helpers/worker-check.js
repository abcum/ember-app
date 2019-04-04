import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

	worker: inject(),

	compute() {
		return function() {
			return this.get('worker').check();
		};
	}

});

import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

	electron: inject(),

	compute() {
		return function() {
			return this.get('electron').reset();
		};
	}

});

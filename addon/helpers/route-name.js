import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { inject } from '@ember/service';

export default Helper.extend({

	router: inject(),

	changed: observer('router.currentRouteName', function() {
		this.recompute();
	}),

	compute() {
		return this.get('router.currentRouteName');
	}

});

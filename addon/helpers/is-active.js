import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { inject } from '@ember/service';

export default Helper.extend({

	router: inject(),

	changed: observer('route.currentRouteName', function() {
		this.recompute();
	}),

	compute([...params]) {
		return this.get('router').isActive(...params);
	}

});

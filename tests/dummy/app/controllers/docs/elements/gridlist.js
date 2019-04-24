import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	items: computed(function() {
		return new Array(1000).fill().map( (v, k) => {
			return { id: k+1 };
		});
	}),

});

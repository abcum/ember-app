import Controller from '@ember/controller';
import { computed } from '@ember/object';
import sparse from '@abcum/ember-app/sparse';

export default Controller.extend({

	items: computed(function() {
		return new Array(1000).fill().map( (v, k) => {
			return { id: k+1 };
		});
	}),

	bigdata: sparse(10, 'search', async function(range) {
		return { total: 1000, data: new Array(range.limit).fill().map( (v, k) => {
			return { id: range.start + k + 1 };
		})};
	}),

});

// BEGIN-SNIPPET docs-demo-elements-gridlist-delayed.js
import Controller from '@ember/controller';
import sparse from '@abcum/ember-app/sparse';

export default Controller.extend({

	bigdata: sparse(100, 'search', async function(range, query) {

		return this.store.query('person', {
			start: range.start,
			limit: range.limit,
			filter: {
				name: query.search
			}
		});

	}),

});
// END-SNIPPET

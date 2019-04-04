// BEGIN-SNIPPET docs-demo-services-clock-controller.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({

	clock: inject(),

	posts: computed('clock.minute', function() {
		return this.get('store').findAll('post');
	}),

});
// END-SNIPPET

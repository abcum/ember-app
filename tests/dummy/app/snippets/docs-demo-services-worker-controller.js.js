// BEGIN-SNIPPET docs-demo-services-worker-controller.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	worker: inject(),

	init() {
		this._super(...arguments);
		this.get('worker').on('updatefound', () => {
			/* Do something when we have an update */
		});
	}

});
// END-SNIPPET

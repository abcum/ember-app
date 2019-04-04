// BEGIN-SNIPPET docs-demo-services-version-controller.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	version: inject(),

	init() {
		this._super(...arguments);
		this.get('version').on('updatefound', () => {
			/* Do something when we have an update */
		});
	}

});
// END-SNIPPET

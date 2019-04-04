// BEGIN-SNIPPET docs-demo-services-electron-controller.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	electron: inject(),

	init() {
		this._super(...arguments);
		this.get('electron').on('updatefound', () => {
			/* Do something when we have an update */
		});
	}

});
// END-SNIPPET

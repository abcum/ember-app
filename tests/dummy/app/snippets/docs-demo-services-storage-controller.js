// BEGIN-SNIPPET docs-demo-services-storage-controller.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	facebook: inject(),
	storage: inject(),

	actions: {
		login() {
			this.get('facebook').login(
				this.get('storage.email')
			);
		}
	}

});
// END-SNIPPET

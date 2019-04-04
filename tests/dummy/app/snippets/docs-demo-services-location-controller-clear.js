// BEGIN-SNIPPET docs-demo-services-location-controller-clear.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	location: inject(),

	actions: {
		stop() {
			this.get('location').clear();
		}
	}

});
// END-SNIPPET

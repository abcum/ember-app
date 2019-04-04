// BEGIN-SNIPPET docs-demo-services-location-controller-watch.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	location: inject(),

	actions: {
		locate() {
			this.get('location').watch({ timeout: 5000 }).then(result => {
				// eslint-disable-next-line no-console
				console.log(result);
			});
		}
	}

});
// END-SNIPPET

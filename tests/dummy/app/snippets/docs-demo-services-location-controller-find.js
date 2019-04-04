// BEGIN-SNIPPET docs-demo-services-location-controller-find.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({

	location: inject(),

	actions: {
		locate() {
			this.get('location').find({ timeout: 5000 }).then(result => {
				// eslint-disable-next-line no-console
				console.log(result);
			});
		}
	}

});
// END-SNIPPET

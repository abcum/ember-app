// BEGIN-SNIPPET docs-demo-services-internet-controller.js
import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({

	internet: inject(),

	status: observer('internet.status', function() {
		// eslint-disable-next-line no-console
		console.log( this.get('internet.status') );
	}),

});
// END-SNIPPET

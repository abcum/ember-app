// BEGIN-SNIPPET docs-demo-services-metrics-clear.js
import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({

	metrics: inject(),

	onLogout() {
		this.get('metrics').clear();
	},

});
// END-SNIPPET

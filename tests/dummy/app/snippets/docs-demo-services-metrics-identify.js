// BEGIN-SNIPPET docs-demo-services-metrics-identify.js
import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({

	metrics: inject(),

	onLogin() {
		this.get('metrics').identify('user:1074018', {
			email: 'info@abcum.com',
		});
	},

});
// END-SNIPPET

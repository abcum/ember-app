// BEGIN-SNIPPET docs-demo-services-metrics-event.js
import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({

	metrics: inject(),

	onClick() {
		this.get('metrics').trackEvent('Puurchase', {
			Currency: 'GBP',
			Amount: 30,
		});
	},

});
// END-SNIPPET

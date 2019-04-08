import Metric from './base';
import features from '../utils/features';
import { assert } from '@ember/debug';

const src = 'script[src*="fbevents.js"]';

export default Metric.extend({

	name: 'facebook-pixel',

	init() {

		if (features.createElement === false) return;

		assert(`You must pass a valid 'id' to the ${this.toString()} adapter`, this.config.id);

		/* eslint-disable */
		!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
		n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
		document,'script','https://connect.facebook.net/en_US/fbevents.js');
		/* eslint-enable */

		window.fbq('init', this.config.id);

		this.trackPage();

	},

	willDestroy() {

		if (features.createElement === false) return;

		document.querySelectorAll(src).forEach(e => {
			e.parentElement.removeChild(e);
		});

		delete window.fbq;
		delete window._fbq;

	},

	clear() {

		if (features.createElement === false) return;

		window.fbq('init', this.config.id, { uid: null });

	},

	identify(id, data) {

		assert(`You must pass an 'id' as the first argument to ${this.toString()}:identify()`, id);

		if (features.createElement === false) return;

		window.fbq('init', this.config.id, { uid: id });

		window.fbq('setUserProperties', this.config.id, data);

	},

	trackPage(data) {

		if (features.createElement === false) return;

		window.fbq('track', 'PageView', data);

	},

	trackEvent(name, data) {

		assert(`You must pass a 'name' as the first argument to ${this.toString()}:trackEvent()`, name);

		if (features.createElement === false) return;

		window.fbq('track', name, data);

	},

});

import Metric from './base';
import features from '../utils/features';
import { assert } from '@ember/debug';

const src = 'script[src*="googletagmanager"]';

export default Metric.extend({

	name: 'google-tag-manager',

	load() {

		if (window.gt) return;

		if (features.createElement() === false) return;

		assert(`You must pass a valid 'id' to the ${this.toString()} adapter`, this.config.id);

		/* eslint-disable */
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer',this.config.id);
		/* eslint-enable */

		window.gt = function(data) { window.dataLayer.push(data); };

	},

	willDestroy() {

		if (features.createElement() === false) return;

		document.querySelectorAll(src).forEach(e => {
			e.parentElement.removeChild(e);
		});

		delete window.dataLayer;

		delete window.gt;

	},

	clear() {

		this.load();

		if (features.createElement() === false) return;

		window.dataLayer.push({
			'event': 'clear',
		});

	},

	identify(id) {

		this.load();

		assert(`You must pass an 'id' as the first argument to ${this.toString()}:identify()`, id);

		if (features.createElement() === false) return;

		window.dataLayer.push({
			'event': 'identify',
			'userId': id,
		});

	},

	trackEvent(name, data) {

		this.load();

		assert(`You must pass a 'name' as the first argument to ${this.toString()}:trackEvent()`, name);

		if (features.createElement() === false) return;

		let event = Object.assign({}, data, {
			event: name,
		});

		window.dataLayer.push(event);

	},

});

import Metric from './base';
import features from '../utils/features';
import { assert } from '@ember/debug';

const src = 'script[src*="raygun"]';

export default Metric.extend({

	load() {

		if (window.rg4js) return;

		if (features.createElement() === false) return;

		assert(`You must pass a valid 'id' to the ${this.toString()} adapter`, this.config.id);

		/* eslint-disable */
		!function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
		(a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
		f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
		h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
		e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
		/* eslint-enable */

		window.rg4js('apiKey', this.config.id);
		window.rg4js('enableCrashReporting', true);
		window.rg4js('enablePulse', true);

	},

	willDestroy() {

		if (features.createElement() === false) return;

		document.querySelectorAll(src).forEach(e => {
			e.parentElement.removeChild(e);
		});

		delete window.rg4js;

	},

	clear() {

		this.load();

		if (features.createElement() === false) return;

		window.rg4js('setUser', {
			isAnonymous: true,
		});

	},

	identify(id, data) {

		this.load();

		assert(`You must pass an 'id' as the first argument to ${this.toString()}:identify()`, id);

		if (features.createElement() === false) return;

		let event = Object.assign({}, data, {
			identifier: id,
		});

		window.rg4js('setUser', event);

	},

	trackPage() {

		this.load();

		if (features.createElement() === false) return;

		window.rg4js('trackEvent', {
			type: 'pageView',
			path: location.pathname
		});

	},

});

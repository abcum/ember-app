import Metric from './base';
import { assert } from '@ember/debug';
import { inject } from '@ember/service';

const src = 'script[src*="google-analytics"]';

export default Metric.extend({

	name: 'google-analytics',

	rooturl: inject(),

	load() {

		if (window.ga) return;

		if (!this.config.id) return;

		/* eslint-disable */
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script',`https://www.google-analytics.com/analytics${this.config.debug ? '_debug' : ''}.js`,'ga');
		/* eslint-enable */

		/* eslint-disable */
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsAutotrack']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script',this.get('rooturl').build('/assets/autotrack.js'),'gaa');
		/* eslint-enable */

		window.ga('create', this.config.id, 'auto');

		if (this.config.trace === true) {
			window.ga_debug = { trace: true };
		}

		if (this.config.sendHitTask === false) {
			window.ga('set', 'sendHitTask', null);
		}

		if (this.config.require) {
			[].concat(this.config.require).forEach(plugin => {
				window.ga('require', plugin);
			});
		}

	},

	willDestroy() {

		document.querySelectorAll(src).forEach(e => {
			e.parentElement.removeChild(e);
		});

		delete window.ga;

	},

	clear() {

		this.load();

		if (!window.ga) return;

		window.ga('set', 'userId', null);

	},

	identify(id) {

		this.load();

		if (!window.ga) return;

		assert(`You must pass an 'id' as the first argument to ${this.toString()}:identify()`, id);

		window.ga('set', 'userId', id);

	},

	trackPage(data) {

		this.load();

		if (!window.ga) return;

		let event = Object.assign({}, data, {
			hitType: 'pageview',
		});

		window.ga('set', 'page', location.pathname);

		window.ga('send', event);

	},

	trackEvent(name, data) {

		this.load();

		if (!window.ga) return;

		assert(`You must pass a 'name' as the first argument to ${this.toString()}:trackEvent()`, name);

		let defaults = { eventCategory: 'Undefined' };

		let event = Object.assign({}, defaults, data, {
			hitType: 'event',
			eventAction: name,
		});

		window.ga('send', event);

	},

});

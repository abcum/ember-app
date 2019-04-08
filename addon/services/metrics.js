import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({

	router: inject(),

	init() {

		this._super(...arguments);

		this.router.on('routeDidChange', () => {
			this.get('metrics').forEach(m => {
				m.trackPage();
			});
		});

	},

	clear(n) {
		switch (arguments.length) {
		case 1:
			return this.get(`metric:${n}`).clear();
		case 0:
			return this.get(`metrics`).forEach(m => {
				m.clear();
			});
		}
	},

	identify(n, id, data) {
		switch (arguments.length) {
		case 3:
			return this.get(`metric:${n}`).identify(id, data);
		case 2:
			[].shift.apply(arguments);
			return this.get(`metrics`).forEach(m => {
				m.identify(...arguments);
			});
		}
	},

	trackPage(n, data) {
		switch (arguments.length) {
		case 2:
			return this.get(`metric:${n}`).trackPage(data);
		case 1:
			[].shift.apply(arguments);
			return this.get(`metrics`).forEach(m => {
				m.trackPage(...arguments);
			});
		}
	},

	trackEvent(n, name, data) {
		switch (arguments.length) {
		case 3:
			return this.get(`metric:${n}`).trackEvent(name, data);
		case 2:
			[].shift.apply(arguments);
			return this.get(`metrics`).forEach(m => {
				m.trackEvent(...arguments);
			});
		}
	},

});

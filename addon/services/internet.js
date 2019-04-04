import Service from '@ember/service';
import feature from '../utils/features';
import { equal } from '@ember/object/computed';

export default Service.extend({

	status: 'online',

	online: equal('status', 'online'),

	offline: equal('status', 'offline'),

	init() {

		this._super(...arguments);

		if (feature.fastboot() === true) return;

		if (feature.addEventListener() === false) return;

		window.addEventListener('online', () => {
			this.set('status', 'online');
		}, false);

		window.addEventListener('offline', () => {
			this.set('status', 'offline');
		}, false);

	}

});

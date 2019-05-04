import Service from '@ember/service';
import Config from '../mixins/config';
import Evented from '@ember/object/evented';
import feature from '../utils/features';

export default Service.extend(Config, Evented, {

	// Whether an update is available
	// for the ember app, so that we
	// can display a notification.

	updatefound: false,

	// Setup the Version service if the
	// feature is supported, and check
	// continuously for updates.

	init() {

		this._super(...arguments);

		this.enabled = this.config.version.enabled;

		if (feature.fastboot() === true) return;

		if (feature.windowLocation() === false) return;

		if (this.config.version.enabled === true) {
			if (this.config.version.frequency) {
				this.timer = setInterval(
					this.check.bind(this),
					this.config.version.frequency,
				);
			}
		}

		this.on('updatefound', () => {
			switch (this.config.version.autoupdate) {
			case false:
				return this.set('updatefound', true);
			case true:
				return this.reset();
			}
		});

		this.check();

	},

	// If this service is going to be
	// destroyed, then let's ensure that
	// the checker timer is cancelled.

	willDestroy() {

		if (this.timer) clearInterval(this.timer);

		this._super(...arguments);

	},

	// Reset reloads the newer software
	// version by reloading the page
	// which will load the new version.

	reset() {

		window.location.reload();

	},

	// Check determines if an update to
	// the application is available by
	// checking the server version.

	check() {

		if (this.config.version.enabled === true) {

			let url = `/version.txt?_=${new Date().getTime()}`;

			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = () => {
				if (this.version === undefined) {
					this.version = xhr.responseText;
				} else if (this.version != xhr.responseText) {
					this.trigger('updatefound');
				}
			};
			xhr.send();

		}

	},

});

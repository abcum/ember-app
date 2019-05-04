import Service from '@ember/service';
import Config from '../mixins/config';
import Evented from '@ember/object/evented';
import feature from '../utils/features';

export default Service.extend(Config, Evented, {

	// The underlying instance of
	// service worker registration,
	// for manipulating the worker.

	worker: null,

	// The underlying active service
	// worker registration, used when
	// detecting a state change.

	active: null,

	// Whether an update is available
	// for the service worker, so that
	// we can display a notification.

	updatefound: false,

	// Setup the Worker service if the
	// feature is supported, and check
	// continuously for updates.

	init() {

		this._super(...arguments);

		this.enabled = this.config.worker.enabled;

		if (feature.fastboot() === true) return;

		if (feature.serviceWorker() === false) return;

		if (this.config.worker.enabled === true) {
			if (this.config.worker.frequency) {
				this.timer = setInterval(
					this.check.bind(this),
					this.config.worker.frequency,
				);
			}
		}

		this.on('updatefound', () => {
			switch (this.config.worker.autoupdate) {
			case false:
				return this.set('updatefound', true);
			case true:
				return this.reset();
			}
		});

		this.setup();

	},

	// If this service is going to be
	// destroyed, then let's ensure that
	// the checker timer is cancelled.

	willDestroy() {

		if (this.timer) clearInterval(this.timer);

		this._super(...arguments);

	},

	// Check determines if an update to
	// the application is available by
	// checking the service worker.

	check() {

		if (this.worker) {
			this.worker.update();
		}

	},

	// Reset reloads the page, notifying
	// the new installed service worker
	// to skip waiting and activate.

	reset() {

		if (this.worker && this.worker.waiting) {
			this.worker.waiting.postMessage('skipWaiting');
		}

	},

	// Setup sets up the service worker
	// and checks for any version changes
	// if the service worker is updated

	setup() {

		if (this.config.worker.enabled === false) {

			let sw = window.navigator.serviceWorker;

			// Deregister all of the service worker
			// registrations at the root of the
			// domain, and then exit.

			sw.getRegistrations().then(regs => {
				for (let reg of regs) {
					reg.unregister();
				}
			});

		}

		if (this.config.worker.enabled === true) {

			let sw = window.navigator.serviceWorker;

			// If a new service worker is activated
			// with skipWaiting, and claims this page
			// then we need to reload the window.

			sw.addEventListener('controllerchange', () => {
				if (this.active) window.location.reload();
			});

			// Register the service worker file at
			// the root of the domain, and wait for
			// the registration to be successful.

			sw.register('/sw.js').then(reg => {

				this.set('worker', reg);

				// If a service worker is waiting to
				// be activated on page load, then
				// immediately activate it and reload.

				if (reg.waiting) {
					this.trigger('updatefound');
				}

				// If an updated service worker is
				// found, then wait for it to install
				// and trigger an 'updatefound' event.

				// reg.addEventListener('updatefound', () => {
				// 	reg.installing.addEventListener('statechange', () => {
				// 		if (reg.installing.state === 'installed') {

				reg.addEventListener('updatefound', (e) => {
					e.target.installing.addEventListener('statechange', (e) => {
						if (e.target.state === 'installed') {

							this.active = this.worker.active;

							if (this.active) {
								return this.trigger('updatefound');
							} else {
								return this.worker.waiting.postMessage('skipWaiting');
							}

						}
					});
				});

			});

		}

	},

});

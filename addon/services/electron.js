import Service from '@ember/service';
import Config from '../mixins/config';
import Evented from '@ember/object/evented';
import Electron from 'electron';

export default Service.extend(Config, Evented, {

	// Whether an update is available
	// for the ember app, so that we
	// can display a notification.

	updatefound: false,

	// Setup the Electron service if the
	// feature is supported, and check
	// continuously for updates.

	init() {

		this._super(...arguments);

		if (Electron === null) return;

		if (this.config.electron.frequency) {
			this.timer = setInterval(
				this.check.bind(this),
				this.config.electron.frequency,
			);
		}

		this.on('updatefound', () => {
			switch (this.config.electron.autoupdate) {
			case false:
				return this.set('updatefound', true);
			case true:
				return this.reset();
			}
		});

		this.setup();

		this.check();

		this.theme();

	},

	setup() {

		if (Electron === null) return;

		const { autoUpdater } = Electron.remote.require('electron-updater');

		autoUpdater.on('update-downloaded', () => {
			this.trigger('updatefound');
		});

	},

	// Reset reloads the newer software
	// version by reloading the page
	// which will load the new version.

	reset() {

		if (Electron === null) return;

		const { autoUpdater } = Electron.remote.require('electron-updater');

		autoUpdater.quitAndInstall({ isSilent: true, isForceRunAfter: true });

	},

	// Check determines if an update to
	// the application is available by
	// checking the server version.

	check() {

		if (Electron === null) return;

		const { autoUpdater } = Electron.remote.require('electron-updater');

		autoUpdater.checkForUpdates().catch(() => {});

	},

	// Theme determines whether this app
	// is running in light or dark mode
	// according to the MacOS setting.

	theme() {

		const prefs = Electron.remote.systemPreferences;

		let theme = () => prefs.isDarkMode() ? 'dark' : 'light';

		prefs.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
			document.body.setAttribute('macos-theme', theme());
		});

		document.body.setAttribute('macos-theme', theme());

	},

});

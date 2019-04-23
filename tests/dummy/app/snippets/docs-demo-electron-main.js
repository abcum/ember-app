// BEGIN-SNIPPET docs-demo-electron-main.js
/* eslint-env node */

const { app, BrowserWindow } = require('electron');

const location = process.env.EMBER_ELECTRON_LOCATION || 'ember://app';

require('./src/emberapp')();
require('./src/mainmenu')();
require('./src/savefile')();

app.once('ready', () => {
	loadapp(false);
});

app.once('window-all-closed', () => {
	app.quit();
});

app.once('will-finish-launching', () => {

	app.setAsDefaultProtocolClient('my-app');

	app.on('browser-window-created', (e, window) => {

		window.once('ready-to-show', () => {
			window.show();
		});

		window.on('new-window-for-tab', () => {
			loadapp(true);
		});

	});

});

const loadapp = function(show) {

	let window = new BrowserWindow({
		width: 1600,
		height: 1100,
		show: show,
		frame: true,
		center: true,
		minWidth: 1024,
		minHeight: 768,
		titleBarStyle: 'hidden',
		backgroundColor: '#1B2431',
		tabbingIdentifier: 'default',
		disableAutoHideCursor: true,
		webPreferences: {
			java: false,
			images: true,
			plugins: true,
			affinity: 'app',
			webSecurity: true,
			sharedWorker: true,
			nodeIntegration: true,
			overlayScrollbars: true,
			experimentalFeatures: false,
			textAreasAreResizable: false,
			allowRunningInsecureContent: false,
			allowDisplayingInsecureContent: false,
		}
	});

	window.loadURL(location);

}
// END-SNIPPET

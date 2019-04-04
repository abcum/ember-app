// BEGIN-SNIPPET docs-demo-electron-index.js
/* eslint-env node */

const { app, BrowserWindow } = require('electron');

const location = process.env.EMBER_ELECTRON_LOCATION || 'ember://dist';

app.disableHardwareAcceleration();

app.once('ready', () => {
	loadapp(false);
});

app.once('window-all-closed', () => {
	app.quit();
});

app.once('will-finish-launching', () => {

	app.on('open-url', (e, path) => {
		if (global.lastWindow) {
			global.lastWindow.webContents.send('open-link', path);
		}
	});

	app.on('open-file', (e, path) => {
		if (global.lastWindow) {
			global.lastWindow.webContents.send('open-file', path);
		}
	});

	app.on('web-contents-created', (e, webContents) => {
		webContents.on('new-window', (e) => {
			e.preventDefault();
		});
	});

	app.on('browser-window-created', (e, window) => {

		window.once('ready-to-show', () => {
			window.show();
		});

		window.on('new-window-for-tab', () => {
			loadapp(true);
		});

		window.on('swipe', (e, direction) => {
			switch (direction) {
			case 'left':
				return window.webContents.goForward();
			case 'right':
				return window.webContents.goBack();
			}
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

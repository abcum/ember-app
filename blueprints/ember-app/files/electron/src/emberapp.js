const { app, protocol: proto, shell, BrowserWindow } = require('electron');
const { join, dirname } = require('path');
const fs = require('fs');

module.exports = function() {

	const MAIN = process.env.EMBER_ELECTRON_LOCATION;
	const FOLD = dirname(require.main.filename);
	const BASE = join(FOLD, '..', 'dist');
	const INDX = join(BASE, 'index.html');

	proto.registerStandardSchemes(['ember'], {
		secure: true,
	});

	app.once('ready', () => {

		proto.registerFileProtocol('ember', (req, fn) => {

			const FILE = req.url.substr(12);
			const FULL = join(BASE, FILE);

			try {
				stat = fs.statSync(FULL);
				return stat.isFile() ? fn(FULL) : fn(INDX);
			} catch (e) {
				return fn(INDX);
			}

		});

	});

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

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('browser-window-created', (e, window) => {

		window.on('focus', () => {
			global.lastWindow = window;
			global.currentWindow = window;
		});

		window.on('blur', () => {
			if (global.currentWindow === window) {
				global.currentWindow = null;
			}
		});

		window.on('swipe', (e, direction) => {
			switch (direction) {
			case 'left':
				return window.webContents.send('swipe-left');
			case 'right':
				return window.webContents.send('swipe-right');
			}
		});

		window.webContents.on('did-fail-load', (e) => {
			window.loadURL(BASE);
		});

	});

	app.on('web-contents-created', (e, webContents) => {

		webContents.on('new-window', (e, url) => {
			if (url.indexOf(MAIN) !== 0) {
				e.preventDefault();
				shell.openExternal(url);
			}
		});

		webContents.on('will-navigate', (e, url) => {
			if (webContents.hostWebContents === null) {
				if (url.indexOf(MAIN) !== 0) {
					e.preventDefault();
					shell.openExternal(url);
				}
			}
		});

	});

};

'use strict';

const Plugin = require('broccoli-plugin');
const XML = require('xmlbuilder');
const Sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = class Webapp extends Plugin {

	constructor(inputNodes, options) {

		super(inputNodes, {
			name: 'Webapp',
		});

		this.opts = options;

	}

	async build() {

		// Resize the base icon image into
		// a smaller favicon image for use
		// in desktop browser tabs.

		let icon = this.find(['**/static/webapp/icon.png'])[0];
		let tile = this.find(['**/static/webapp/tile.png'])[0];

		// Resize the base icon image into
		// a smaller favicon image for use
		// in desktop browser tabs.

		await this.sharp(icon, '/favicon.png', 16);

		// Resize the base tile image into
		// a set of smaller images for use
		// in Windows 10 app launcher.

		await this.sharp(tile, '/static/webapp/tile-70x70.png', 70);
		await this.sharp(tile, '/static/webapp/tile-144x144.png', 144);
		await this.sharp(tile, '/static/webapp/tile-150x150.png', 150);
		await this.sharp(tile, '/static/webapp/tile-310x310.png', 310);

		// Resize the base icon image into
		// a set of smaller images for use
		// in Apple and Android devices.

		await this.sharp(icon, '/static/webapp/icon-16x16.png', 16);
		await this.sharp(icon, '/static/webapp/icon-32x32.png', 32);
		await this.sharp(icon, '/static/webapp/icon-57x57.png', 57);
		await this.sharp(icon, '/static/webapp/icon-76x76.png', 76);
		await this.sharp(icon, '/static/webapp/icon-120x120.png', 120);
		await this.sharp(icon, '/static/webapp/icon-128x128.png', 128);
		await this.sharp(icon, '/static/webapp/icon-152x152.png', 152);
		await this.sharp(icon, '/static/webapp/icon-167x167.png', 167);
		await this.sharp(icon, '/static/webapp/icon-180x180.png', 180);
		await this.sharp(icon, '/static/webapp/icon-192x192.png', 192);
		await this.sharp(icon, '/static/webapp/icon-512x512.png', 512);

		// Write the module content to the
		// virtual config.js file so it can
		// be imported by the service worker.

		const browser = XML.create({
			browserconfig: {
				msapplication: {
					tile: {
						square70x70logo: { '@src': '/static/webapp/tile-70x70.png' },
						square144x144logo: { '@src': '/static/webapp/tile-144x144.png' },
						square150x150logo: { '@src': '/static/webapp/tile-150x150.png' },
						square310x310logo: { '@src': '/static/webapp/tile-310x310.png' },
						TileColor: { '#text': this.opts.color },
					},
				},
			},
		});

		fs.writeFileSync(path.join(this.outputPath, 'browserconfig.xml'), browser);

		// Write the module content to the
		// virtual config.js file so it can
		// be imported by the service worker.

		const manifest = JSON.stringify({
			background_color: this.opts.background,
			description: this.opts.description,
			display: this.opts.display,
			name: this.opts.name,
			orientation: this.opts.orientation,
			scope: this.opts.scope,
			short_name: this.opts.short,
			start_url: this.opts.start,
			theme_color: this.opts.color,
			icons: [
				{ src: '/static/webapp/icon-16x16.png', sizes: '16x16' },
				{ src: '/static/webapp/icon-32x32.png', sizes: '32x32' },
				{ src: '/static/webapp/icon-192x192.png', sizes: '192x192' },
				{ src: '/static/webapp/icon-512x512.png', sizes: '512x512' },
			]
		});

		fs.writeFileSync(path.join(this.outputPath, 'manifest.webmanifest'), manifest);

	}

	sharp(image, resize, size) {

		let i = path.join(this.inputPaths[0], image);
		let o = path.join(this.outputPath, resize);
		let f = path.dirname(o);

		try {
			fs.mkdirSync(f, { recursive: true });
		} catch (e) { }

		return Sharp(i).resize(size, size).toFile(o);

	}

	find(globs) {

		let files = [];

		this.inputPaths.forEach(path => {
			globs.forEach(patt => {
				glob.sync(patt, { cwd: path, nodir: true }).forEach(file => {
					if (files.indexOf(file) === -1) {
						files.push(file);
					}
				});
			});
		});

		return files;

	}

};

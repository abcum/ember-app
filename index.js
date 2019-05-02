'use strict';

var path = require('path');

let Stew = require('broccoli-stew');
let Tree = require('broccoli-merge-trees');
let Rollup = require('broccoli-rollup');
let Header = require('./plugin/header');
let Minify = require('./plugin/minify');
let Images = require('./plugin/images');
let Webapp = require('./plugin/webapp');
let Worker = require('./plugin/worker');
let Version = require('./plugin/version');
var uglify = require('broccoli-uglify-sourcemap');

const fastboot = {
	using: [{ transformation: 'fastboot'}]
};

const defaults = {
	version: {
		enabled: false,
	},
	worker: {
		enabled: false,
	},
	images: {
		jpeg: {
			quality: 80,
			progressive: false,
		},
		png: {
			progressive: false,
			compressionLevel: 9,
		},
		webp: {
			quality: 80,
			lossless: false,
			nearLossless: false,
		},
		tiff: {
			quality: 80,
			compression: 'jpeg',
			nearLossless: false,
		},
	},
	webapp: {
		background: '#ffffff',
		color: '#000000',
		description: '',
		display: 'standalone',
		name: '',
		orientation: 'portrait',
		scope: '/',
		short: '',
		start: '/',
		style: 'default',
	},
	minify: {
		collapseWhitespace : true,
		removeComments : true,
		minifyCSS : true,
		minifyJS : true,
		ignoreCustomComments: [
			/^\s+EMBER_CLI_FASTBOOT_TITLE/,
			/^\s+EMBER_CLI_FASTBOOT_HEAD/,
			/^\s+EMBER_CLI_FASTBOOT_BODY/,
		]
	},
};

module.exports = {

	name: require('./package').name,

	included(app) {

		this._super.included(app);

		this.app = app; this.app.options = this.app.options || {};

		// Don't store app config in meta tag
		this.app.options.storeConfigInMeta = false;

		// Ensure specific files are ignored
		this.app.options.fingerprint = this.app.options.fingerprint || {};
		this.app.options.fingerprint.exclude = this.app.options.fingerprint.exclude || [];
		this.app.options.fingerprint.exclude.push('version.txt', 'sw.js');

		// Ensure correct file types are converted
		this.app.options.fingerprint = this.app.options.fingerprint || {};
		this.app.options.fingerprint.replaceExtensions = this.app.options.fingerprint.replaceExtensions || [];
		this.app.options.fingerprint.replaceExtensions.push('html', 'css', 'js', 'json', 'xml');

		// Ensure correct file types are fingerprinted
		this.app.options.fingerprint = this.app.options.fingerprint || {};
		this.app.options.fingerprint.extensions = this.app.options.fingerprint.extensions || [];
		this.app.options.fingerprint.extensions.push('xml', 'webmanifest');
		this.app.options.fingerprint.extensions.push('js', 'css', 'eot', 'otf', 'ttf', 'woff', 'woff2');
		this.app.options.fingerprint.extensions.push('gif', 'ico', 'jpg', 'jp2', 'png', 'svg', 'tiff', 'webp');

		// Get the ember-app configuration options
		this.opt = this.project.config(process.env.EMBER_ENV)['ember-app'] || {};

		// Specify the default minify options
		this.opt.minify = Object.assign({}, defaults.minify, this.opt.minify);

		// Specify the default images options
		this.opt.images = Object.assign({}, defaults.images, this.opt.images);

		// Specify the default images options
		this.opt.webapp = Object.assign({}, defaults.webapp, this.opt.webapp);

		// Specify the default worker options
		this.opt.worker = Object.assign({}, defaults.worker, this.opt.worker);

		// Specify the default version options
		this.opt.version = Object.assign({}, defaults.version, this.opt.version);

		// Ensure that only one type of update checker is enabled
		if (this.opt.worker.enabled && this.opt.version.enabled) {
			throw new Error("Only one of the `worker` or `version` options can be enabled at the same time.");
		}

		// Check if we are in Electron
		this.app.import('vendor/electron/inject.js', {
			outputFile: 'assets/electron.js'
		});

		// Import ES6 library for Electron
		this.app.import('vendor/electron/import.js', {
			exports: { Electron: ['default'] }
		});

		// Import Autotrack analytics library
		this.app.import('node_modules/autotrack/autotrack.js', {
			outputFile: 'assets/autotrack.js'
		});

		// Include `marked.js` library
		if (this.opt.plugins && this.opt.plugins.marked) {
			this.app.import('node_modules/marked/marked.min.js');
			this.app.import('vendor/marked.js', {
				exports: { marked: ['default'] }
			});
		}

		// Include `chart.js` library
		if (this.opt.plugins && this.opt.plugins.chart) {
			this.app.import('node_modules/chart.js/dist/Chart.js', fastboot);
			this.app.import('vendor/chart.js', {
				exports: { Chart: ['default'] }
			});
		}

		// Include `vis.js` library
		if (this.opt.plugins && this.opt.plugins.vis) {
			this.app.import('node_modules/vis/dist/vis.js', fastboot);
			this.app.import('node_modules/vis/dist/vis.css');
			this.app.import('vendor/vis.js', {
				exports: { vis: ['default'] }
			});
		}

		// Include `moment.js` library
		if (this.opt.plugins && this.opt.plugins.moment) {

			this.app.import('node_modules/moment/moment.js');

			this.app.import('vendor/moment/instance.js');
			this.app.import('vendor/moment/weekdays.js');
			this.app.import('vendor/moment/workdays.js');
			this.app.import('vendor/moment/override.js');

			this.app.import('vendor/moment.js', {
				exports: { moment: ['default'] }
			});

			if (this.opt.plugins.moment.locales) {
				[].concat(this.opt.plugins.moment.locales).forEach( (l) => {
					this.app.import('node_modules/moment/locale/'+l+'.js');
					this.app.import('vendor/moment/locale/'+l+'.js');
				});
			}

		}

		// Include `codemirror.js` library
		if (this.opt.plugins && this.opt.plugins.codemirror) {

			this.app.import('node_modules/codemirror/lib/codemirror.js', fastboot);
			this.app.import('node_modules/codemirror/lib/codemirror.css');
			this.app.import('node_modules/codemirror/addon/mode/simple.js', fastboot);
			this.app.import('node_modules/codemirror/addon/mode/multiplex.js', fastboot);

			if (this.opt.plugins.codemirror.includeTags) {
				this.app.import('node_modules/codemirror/addon/edit/closetag.js', fastboot);
				this.app.import('node_modules/codemirror/addon/edit/matchtags.js', fastboot);
			}

			if (this.opt.plugins.codemirror.includeBrackets) {
				this.app.import('node_modules/codemirror/addon/edit/closebrackets.js', fastboot);
				this.app.import('node_modules/codemirror/addon/edit/matchbrackets.js', fastboot);
			}

			if (this.opt.plugins.codemirror.includeComments) {
				this.app.import('node_modules/codemirror/addon/comment/comment.js', fastboot);
			}

			if (this.opt.plugins.codemirror.includeWhitespace) {
				this.app.import('node_modules/codemirror/addon/edit/trailingspace.js', fastboot);
			}

			if (this.opt.plugins.codemirror.modes) {
				[].concat(this.opt.plugins.codemirror.modes).forEach( (m) => {
					this.app.import('node_modules/codemirror/mode/'+m+'/'+m+'.js', fastboot);
				});
			}

			if (this.opt.plugins.codemirror.themes) {
				[].concat(this.opt.plugins.codemirror.themes).forEach( (t) => {
					this.app.import('node_modules/codemirror/theme/'+t+'.css');
				});
			}

			this.app.import('vendor/codemirror.css');
			this.app.import('vendor/codemirror.js', {
				exports: {
					CodeMirror: ['default']
				}
			});

		}

	},

	treeForPublic(tree) {

		return tree;

	},

	treeForVendor(tree) {

		return tree;

	},

	postprocessTree(type, tree) {

		if (type !== 'all') return tree;

		let p = this.treeFor('public');

		// Minify the index.html file
		let h = new Minify(tree, this.opt.minify);

		// Generate the webapp files
		let a = new Webapp([tree], this.opt.webapp);

		// Compress all web images
		let i = new Images([tree], this.opt.images);

		// Create the version.txt file
		let v = new Version([tree], this.opt.version);

		// Create the service worker file
		let w = new Worker([tree], this.opt.worker);

		w = new Rollup(new Tree([p, w]), {
			rollup: {
				input: 'sw.js',
				output: {
					name: 'sw',
					file: 'sw.js',
					format: 'iife',
				},
			}
		});

		w = this.app.env === 'production' ? uglify(w) : w;

		// Output the fully bundled tree

		return new Tree([tree, h, i, a, v, w], { overwrite: true });

	},

	contentFor(type) {

		if (type === 'head') {
			return Header(this.opt);
		}

		if (process.env.EMBER_CLI_ELECTRON) {
			let rootURL = this.project.config(process.env.EMBER_ENV).rootURL;
			if (type === 'head-footer') {
				return `<script src="${rootURL}assets/electron.js"></script>`;
			}
		}

	},

	includedCommands() {

		return {
			'electron:run': require('./lib/commands/run'),
			'electron:serve': require('./lib/commands/serve'),
			'electron:build': require('./lib/commands/build'),
		};

	},

	importTransforms() {

		return {
			fastboot(tree) {
				return Stew.map(tree, (v) => {
					return `if (typeof FastBoot === "undefined") { ${v} }`;
				});
			}
		}

	},

};

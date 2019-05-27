/* globals module, require */
// BEGIN-SNIPPET docs-demo-config-example.js
'use strict';

const pkg = require('../package.json');

module.exports = function(environment) {

	var ENV = {

		environment,
		rootURL: '/',
		locationType: 'auto',
		modulePrefix: 'dummy',

		'ember-app': {
			electron: {
				autoupdate: false, // Specify whether app should auto install
				frequency: 5 * 60 * 1000, // Update check frequency
			},
			version: {
				enabled: false, // Enable version checks?
				version: pkg.version, // Set to `null` to use build time
				autoupdate: false, // Specify whether page should auto reload
				frequency: 5 * 60 * 1000, // Update check frequency
			},
			worker: {
				enabled: true, // Enable service worker?
				version: pkg.version, // Set to `null` to use build time
				autoupdate: false, // Specify whether page should auto reload
				frequency: 5 * 60 * 1000, // Update check frequency
				prepend: undefined,
				includes: [ // Include matching static assets
					'assets/*',
					'static/*',
				],
				excludes: [ // Exclude matching static assets
					'assets/*.map',
				],
				specific: [
					'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700',
				],
			},
			webapp: {
				background: '#ffffff', // Background color for launch page
				color: '#00bfff', // Theme color of the application
				description: '', // A general description of the pinned site
				display: 'standalone', // The preferred display mode for the website
				name: 'Ember App', // The name of the app when displayed to the user
				orientation: 'portrait', // The default orientation for the pinned site
				scope: '/', // The navigation scope of this site's context
				short: 'ember-app', // A short human-readable name for the application
				start: '/', // The URL that loads when a user launches the application
				style: 'default', // The iOS menu bar style for the application
			},
			metrics: [
				{
					name: 'google-analytics',
					environments: ['production'],
					config: {
						id: 'UA-12345678-1',
						debug: false,
						trace: false,
						sendHitTask: true,
						require: [
							'ecommerce',
							'maxScrollTracker',
							'outboundLinkTracker',
							'socialWidgetTracker',
							'pageVisibilityTracker',
						],
					}
				},
				{
					name: 'facebook-pixel',
					environments: ['production'],
					config: {
						id: '1234567890'
					}
				},
				{
					name: 'mixpanel',
					environments: ['production'],
					config: {
						id: '0f76c037-4d76-4fce-8a0f-a9a8f89d1453'
					}
				},
				{
					name: 'intercom',
					environments: ['production'],
					config: {
						id: 'def1abc2'
					}
				},
			],
			plugins: {
				chart: true, // Enable chart.js library
				marked: true, // Enable marked.js library
				pdf: true, // Enable pdf.js library
				vis: true, // Enable vis.js library
				moment: { // Enable moment.js library
					locales: ['en-gb'],
				},
				codemirror: { // Enable codemirror library
					includeTags: true,
					includeComments: true,
					includeBrackets: true,
					includeWhitespace: true,
					modes: ["htmlmixed", "css",  "sass",  "javascript",  "markdown",  "handlebars"],
					themes: ["base16-dark", "base16-light", "bespin", "dracula", "eclipse"],
				},
			},
		},

	};

	return ENV;

};
// END-SNIPPET

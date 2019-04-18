/* globals module */
// BEGIN-SNIPPET docs-demo-config-default.js
'use strict';

module.exports = function(environment) {

	var ENV = {

		environment,
		rootURL: '/',
		locationType: 'auto',
		modulePrefix: 'dummy',

		'ember-app': {
			plugins: null,
			electron: {
				autoupdate: false,
			},
			version: {
				enabled: false,
				autoupdate: false,
				frequency: 5 * 60 * 1000,
			},
			worker: {
				enabled: false,
				autoupdate: false,
				frequency: 5 * 60 * 1000,
			},
			images: {
				jpeg: {
					quality: 80,
					progressive: true,
				},
				png: {
					progressive: true,
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
		},

	};

	return ENV;

};
// END-SNIPPET

'use strict';

module.exports = function(environment) {

	let ENV = {

		environment,
		rootURL: '/',
		locationType: 'auto',
		modulePrefix: 'dummy',

		'ember-app': {
			worker: {
				enabled: false,
			},
			version: {
				enabled: false,
			},
			plugins: {
				chart: true,
				marked: true,
				vis: true,
				moment: {
					locales: ['en-gb'],
				},
				codemirror: {
					includeTags: true,
					includeComments: true,
					includeBrackets: true,
					includeWhitespace: true,
					modes: ["htmlmixed", "css",  "sass",  "javascript",  "markdown",  "handlebars"],
					themes: ["base16-dark", "base16-light", "bespin", "dracula", "eclipse"],
				},
			},
		},

		APP: {
			BINDINGS: false,
			LOG_RESOLVER: false,
			LOG_TRANSITIONS: false,
			LOG_VIEW_LOOKUPS: false,
			LOG_ACTIVE_GENERATION: false,
			LOG_TRANSITIONS_INTERNAL: false,
			RAISE_ON_DEPRECATION: false,
			LOG_STACKTRACE_ON_DEPRECATION: false,
		},

		EmberENV: { FEATURES: { }, EXTEND_PROTOTYPES: { Date: false } },

	};

	if (environment === 'test') {
		ENV.APP.autoboot = false;
		ENV.locationType = 'none';
		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'development') {
		ENV.rootURL = '/';
	}

	if (environment === 'production') {
		ENV.rootURL = 'ADDON_DOCS_ROOT_URL';
	}

	return ENV;

};

'use strict';

module.exports = {

	description: 'Generates a configuration for the ember-app addon.',

	normalizeEntityName() {},

	locals(options) {
		return {
			name: options.project.name(),
		};
	},

};


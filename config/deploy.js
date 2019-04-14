/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {

	let ENV = {
		build: {}
	};

	if (deployTarget === 'development') {
		ENV.build.environment = 'development';
	}

	if (deployTarget === 'staging') {
		ENV.build.environment = 'production';
	}

	if (deployTarget === 'production') {
		ENV.build.environment = 'production';
	}

	ENV.git = {
		repo: 'git@github.com:abcum/ember-app.git',
		branch: 'gh-pages',
		worktreePath: '/tmp/deploy-dist',
	};

	return ENV;

};

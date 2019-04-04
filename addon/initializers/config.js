import { typeOf } from '@ember/utils';

const defaults = {
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
	metrics: [],
};

export default function(application) {

	let config = application.resolveRegistration('config:environment');

	if (typeOf(config) !== 'object') {
		throw new Error("Please specify a valid app environment configuration.");
	}

	let option = Object.assign({}, defaults, config['ember-app']);

	application.register('config:ember-app', option, { instantiate: false });

	application.inject('service:electron', 'config', 'config:ember-app');
	application.inject('service:version', 'config', 'config:ember-app');
	application.inject('service:worker', 'config', 'config:ember-app');

}

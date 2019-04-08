export default function(instance) {

	let m = [];

	// Get the app config
	let c = instance.lookup('config:ember-app');

	// Get the current environment
	let e = instance.resolveRegistration('config:environment');

	// Prevent lookedup metrics from instantiating
	instance.registerOptionsForType('metric', { instantiate: false });

	[].concat(c.metrics).forEach(metric => {

		let n = `metric:${metric.name}`;

		// Does the specified metric exist?
		let f = instance.lookup(n);

		// Should the metric run in this environment?
		let a = metric.environments.includes(e.environment);

		if (f && a) {

			let o = f.create(instance.ownerInjection(), {
				name: metric.name, config: metric.config
			});

			instance.register(n, o);
			instance.inject('service:metrics', n, n);

			m.push(o);

		}

	});

	// Register the defined metrics as 'all'
	instance.register('metrics:all', m, { instantiate: false });

	// Push the defined metrics into the service
	instance.inject('service:metrics', 'metrics', 'metrics:all');

}

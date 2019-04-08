export default function(application) {

	application.inject('route', 'metrics', 'service:metrics');
	application.inject('controller', 'metrics', 'service:metrics');
	application.inject('component', 'metrics', 'service:metrics');

}

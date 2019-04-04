export default function(application) {

	application.inject('route', 'worker', 'service:worker');
	application.inject('controller', 'worker', 'service:worker');
	application.inject('component', 'worker', 'service:worker');

}

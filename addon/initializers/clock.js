export default function(application) {

	application.inject('route', 'clock', 'service:clock');
	application.inject('controller', 'clock', 'service:clock');
	application.inject('component', 'clock', 'service:clock');

}

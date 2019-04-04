export default function(application) {

	application.inject('route', 'location', 'service:location');
	application.inject('controller', 'location', 'service:location');
	application.inject('component', 'location', 'service:location');

}

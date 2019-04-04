export default function(application) {

	application.inject('route', 'storage', 'service:storage');
	application.inject('controller', 'storage', 'service:storage');
	application.inject('component', 'storage', 'service:storage');

}

export default function(application) {

	application.inject('route', 'version', 'service:version');
	application.inject('controller', 'version', 'service:version');
	application.inject('component', 'version', 'service:version');

}

export default function(application) {

	application.inject('route', 'scrollup', 'service:scrollup');
	application.inject('controller', 'scrollup', 'service:scrollup');
	application.inject('component', 'scrollup', 'service:scrollup');

}

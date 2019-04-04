export default function(application) {

	application.inject('route', 'electron', 'service:electron');
	application.inject('controller', 'electron', 'service:electron');
	application.inject('component', 'electron', 'service:electron');

}

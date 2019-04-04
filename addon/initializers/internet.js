export default function(application) {

	application.inject('route', 'internet', 'service:internet');
	application.inject('controller', 'internet', 'service:internet');
	application.inject('component', 'internet', 'service:internet');

}

import DocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = DocsRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function() {

	docsRoute(this, function() {

		this.route('config');
		this.route('styling');
		this.route('modules');
		this.route('webapp');
		this.route('electron');

		this.route('services', function() {
			this.route('clock');
			this.route('electron');
			this.route('internet');
			this.route('location');
			this.route('metrics');
			this.route('storage');
			this.route('version');
			this.route('worker');
		});

		this.route('elements', function() {
			this.route('chart');
			this.route('codemirror');
			this.route('contextmenu');
			this.route('document');
			this.route('dropdown');
			this.route('droppable');
			this.route('editable');
			this.route('frame');
			this.route('gravatar');
			this.route('gridlist');
			this.route('initials');
			this.route('image');
			this.route('input');
			this.route('link');
			this.route('modal');
			this.route('popup');
			this.route('select');
			this.route('social');
			this.route('tag');
			this.route('tooltip');
		});

		this.route('helpers', function() {
			this.route('actions');
			this.route('arrays');
			this.route('dom');
			this.route('events');
			this.route('format');
			this.route('inputs');
			this.route('keyboard');
			this.route('logic');
			this.route('maths');
			this.route('objects');
			this.route('promises');
			this.route('routing');
			this.route('scrolling');
			this.route('sorting');
			this.route('strings');
			this.route('time');
		});

	});

});

export default Router;

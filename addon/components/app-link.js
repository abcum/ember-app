import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import Electron from 'electron';

export default Component.extend({

	tagName: 'a',

	target: '_blank',

	href: alias('url'),

	rel: 'noopener noreferrer',

	attributeBindings: [
		'download',
		'href',
		'rel',
		'target',
	],

	click(e) {

		if (!Electron) return;

		let url = this.get('url');

		let download = this.get('download');

		if (download) {
			Electron.remote.getCurrentWebContents().downloadURL(url);
		} else {
			Electron.remote.shell.openExternal(url);
		}

		e.stopPropagation();

		e.preventDefault();

		return false;

	},

});

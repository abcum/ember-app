import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import Electron from 'electron';

export default Component.extend({

	tagName: 'a',

	href: alias('shareurl'),

	rel: 'noopener noreferrer',

	attributeBindings: [
		'href',
		'rel',
	],

	click(e) {

		let w = 600;
		let h = 400;
		var l = (screen.width / 2) - (w / 2);
		var t = (screen.height / 2) - (h / 2);

		let url = this.get('shareurl');

		if (Electron) {
			Electron.remote.shell.openExternal(url);
		} else {
			window.open(url, null, `location=no, menubar=no, resizeable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, width=${w}, height=${h}, top=${t}, left=${l}`);
		}

		e.stopPropagation();

		e.preventDefault();

		return false;

	},

});

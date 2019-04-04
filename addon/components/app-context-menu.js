import Component from '@ember/component';
import { inject } from '@ember/service';
import Electron from 'electron';
import layout from '../templates/components/app-context-menu';

export default Component.extend({

	layout,

	visible: !Electron,

	tagName: 'app-context-menu',

	contextmenu: inject(),

	attributeBindings: ['visible'],

	didRender() {

		this._super(...arguments);

		let w = this.element.offsetWidth;
		let h = this.element.offsetHeight;
		let x = this.get('contextmenu.x');
		let y = this.get('contextmenu.y');

		while ( x+w > window.innerWidth-30 ) x--;
		while ( y+h > window.innerHeight-30 ) y--;

		this.element.style.top = `${y}px`;
		this.element.style.left = `${x}px`;

	},

});

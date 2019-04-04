import Component from '@ember/component';
import { inject } from '@ember/service';
import { next } from '@ember/runloop';
import layout from '../templates/components/app-context-menu-item';

export default Component.extend({

	layout,

	contextmenu: inject(),

	tagName: 'app-context-menu-item',

	type: 'normal',

	enabled: true,

	visible: true,

	checked: false,

	attributeBindings: [
		'type',
		'enabled',
		'visible',
		'checked',
	],

	mouseUp() {
		next( () => this.get('contextmenu').hide());
	},

	didInsertElement() {
		this._super(...arguments);
		this.get('contextmenu.items').addObject(this);
	},

	willDestroyElement() {
		this._super(...arguments);
		this.get('contextmenu.items').removeObject(this);
	},

});

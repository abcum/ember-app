import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import layout from "../templates/components/app-tag";

export default Component.extend({

	layout,

	tagName: 'app-tag',

	closeable: notEmpty('close'),

	attributeBindings: [
		'closeable',
		'curved',
		'key',
		'type',
	],

	actions: {

		close() {
			if ( this.get('close') ) {
				return this.get('close')();
			}
		},

	}

});

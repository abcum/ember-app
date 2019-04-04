import { A } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/app-select';

const marked = (option) => option.element.selected;

export default Component.extend({

	layout,

	tabindex: 0,

	multiple: false,

	disabled: false,

	tagName: 'select',

	attributeBindings: [
		'name',
		'title',
		'required',
		'tabindex',
		'multiple',
		'disabled',
	],

	options: computed(function() {
		return A([]);
	}),

	change() {

		let value = null;

		if ( this.get('multiple') ) {
			let selected = this.get('options').filter(marked);
			value = selected.map(option => option.get('value'));
		} else {
			let selected = this.get('options').find(marked);
			value = selected ? selected.get('value') : null;
		}

		this.get('select')(value);

	},

	actions: {

		register(option) {
			this.get('options').addObject(option);
		},

		unregister(option) {
			this.get('options').removeObject(option);
		},

	},

});

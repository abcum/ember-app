import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import layout from '../../templates/components/app-select/option';

export default Component.extend({

	layout,

	tabindex: 0,

	disabled: false,

	tagName: 'option',

	attributeBindings: [
		'title',
		'value',
		'label',
		'selected',
		'disabled',
	],

	didInsertElement() {
		this._super(...arguments);
		this.get('register')(this);
	},

	willDestroyElement() {
		this.get('unregister')(this);
		this._super(...arguments);
	},

	selected: computed('value', 'input.{value,multiple}', function() {
		if (this.get('input.multiple')) {
			return A( this.get('input.value') ).includes( this.get('value') );
		} else {
			return this.get('value') === this.get('input.value');
		}
	}),

});

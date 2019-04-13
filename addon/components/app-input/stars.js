import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/app-input/stars';

export default Component.extend({

	layout,

	min: 1,

	max: 5,

	value: 0,

	onChange() {},

	color: '#444',

	disabled: false,

	tagName: 'app-input-stars',

	stars: computed('min', 'max', function() {
		let b = this.get('min');
		let e = this.get('max');
		return Array.apply(null, Array(e-b+1)).map( (_, n) => n + b );
	}),

	actions: {

		toggle(value) {

			if (this.disabled) return;

			if (this.get('value') === value) {
				this.decrementProperty('value');
			} else {
				this.set('value', value);
			}

			this.get('onChange')( this.get('value') );

		}

	}

});

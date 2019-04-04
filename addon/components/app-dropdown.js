import Component from '@ember/component';
import { computed } from '@ember/object';
import { copy } from '@ember/object/internals';
import { A } from '@ember/array';
import layout from '../templates/components/app-dropdown';

export default Component.extend({

	layout,

	hidden: true,

	tabindex: 0,

	multiple: false,

	disabled: false,

	tagName: 'app-dropdown',

	attributeBindings: [
		'name',
		'title',
		'required',
		'tabindex',
		'multiple',
		'disabled',
	],

	init() {

		this._super(...arguments);

		this.didEscapeHandler = (e => {
			if (e.which === 27) this.close();
		}).bind(this);

	},

	willDestroyElement() {

		document.removeEventListener('keydown', this.didEscapeHandler);

		this._super(...arguments);

	},

	open() {

		if ( this.get('disabled') ) return;

		this.send('style');

		this.set('hidden', false);

		document.addEventListener('keydown', this.didEscapeHandler);

	},

	close() {

		this.set('hidden', true);

		document.removeEventListener('keydown', this.didEscapeHandler);

	},

	options: computed(function() {
		return A([]);
	}),

	items: computed('value', function() {
		return A( copy( this.get('value') ) );
	}),

	label: computed('value', 'default', 'multiple', 'options.@each.{label,value}', function() {

		let label = null;

		label = this.get('options').filter(option => {
			if ( this.get('multiple') ) {
				return A( this.get('value') ).includes( option.get('value') );
			} else {
				return this.get('value') == option.get('value');
			}
		});

		label = label.map(option => {
			return option.get('label') ? option.get('label') : option.innerHTML;
		});

		return label.join(', ') || this.get('default');

	}),

	actions: {

		register(option) {
			this.get('options').addObject(option);
		},

		unregister(option) {
			this.get('options').removeObject(option);
		},

		open() {
			this.open();
		},

		close() {
			this.close();
		},

		style() {

			let f = this.element.children[2];
			let w = this.element.children[2].offsetWidth;
			let h = this.element.children[2].offsetHeight;
			let t = this.element.children[0].getBoundingClientRect().top - 5;
			let l = this.element.children[0].getBoundingClientRect().left - 5;

			let [ x, y ] = [ 0, -10 ];

			while ( l+w > window.innerWidth-30 ) {
				l--; x--;
			}

			while ( t+h > window.innerHeight-30 ) {
				t--; y--;
			}

			f.style.top = `${y}px`;
			f.style.left = `${x}px`;

		},

		select(option) {

			this.send('close');

			let value = option.get('value');

			if ( this.get('multiple') ) {
				let items = this.get('items');
				if ( items.includes(value) ) {
					value = items.removeObject(value);
				} else {
					value = items.addObject(value);
				}
			}

			this.get('select')(value);

		},

	},

});

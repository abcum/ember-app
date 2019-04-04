import Component from '@ember/component';
import layout from '../templates/components/app-modal';

export default Component.extend({

	layout,

	close() {},

	init() {

		this._super(...arguments);

		this.didEscapeHandler = (e => {
			if (e.which === 27) this.get('close')();
		}).bind(this);

		document.addEventListener('keydown', this.didEscapeHandler);

	},

	willDestroyElement() {

		document.removeEventListener('keydown', this.didEscapeHandler);

		this._super(...arguments);

	},

	actions: {

		close() {
			return this.get('close')();
		},

	}

});

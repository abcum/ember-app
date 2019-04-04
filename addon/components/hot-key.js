import Component from '@ember/component';
import { keys, mods } from '../utils/keys';

export default Component.extend({

	tagName: undefined,

	key: '',

	onPress() {},

	init() {

		this._super(...arguments);

		this.onPressHandler = (e => {
			this.handle(e);
		}).bind(this);

	},

	willInsertElement() {

		this._super(...arguments);

		window.addEventListener('keydown', this.onPressHandler);

	},

	willDestroyElement() {

		window.removeEventListener('keydown', this.onPressHandler);

		this._super(...arguments);

	},

	handle(e) {

		let w = e.which;
		let k = this.get('key');
		let a = !!this.get('alt');
		let c = !!this.get('ctrl');
		let m = !!this.get('meta');
		let s = !!this.get('shift');

		if ( e.altKey ? !a : a ) {
			return true;
		}

		if ( e.ctrlKey ? !c : c ) {
			return true;
		}

		if ( e.metaKey ? !m : m ) {
			return true;
		}

		if ( e.shiftKey ? !s : s ) {
			return true;
		}

		if ( keys[w] !== k && mods[w] !== k ) {
			return true;
		}

		this.onPress();

		return false;

	},

});

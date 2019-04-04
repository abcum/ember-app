import Mixin from '@ember/object/mixin';
import { debounce } from '@ember/runloop';

export default Mixin.create({

	init() {

		this._super(...arguments);

		this.didResizeHandler = (e => {
			debounce(this, this.didResizeElement, e, 250);
		}).bind(this);

	},

	didResizeElement() {},

	didInsertElement() {

		this._super(...arguments);

		window.addEventListener('resize', this.didResizeHandler);

	},

	willDestroyElement() {

		window.removeEventListener('resize', this.didResizeHandler);

		this._super(...arguments);

	},

});

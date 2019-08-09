import Component from '@ember/component';
import features from '../utils/features';

export default Component.extend({

	didUpdate() {

		this._super(...arguments);

		if (features.fastboot() === true) return;

		window.scrollTo({
			top: this.top,
			left: this.left,
			behavior: this.smooth ? 'smooth' : 'auto',
		});

	},

});

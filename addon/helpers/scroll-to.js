import Helper from '@ember/component/helper';
import features from '../utils/features';

export default Helper.extend({

	compute(args, { top = 0, left = 0, smooth = false }) {
		return function() {

			if (features.fastboot() === true) return;

			window.scrollTo({
				top: top,
				left: left,
				behavior: smooth ? 'smooth' : 'auto',
			});

		};
	}

});

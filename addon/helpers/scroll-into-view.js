import Helper from '@ember/component/helper';
import features from '../utils/features';

export default Helper.extend({

	compute(args, { element = undefined, block = 'start', inline = 'nearest', smooth = false }) {
		return function() {

			if (features.fastboot() === true) return;

			element.scrollIntoView({
				block: block,
				inline: inline,
				behavior: smooth ? 'smooth' : 'auto',
			});

		};
	}

});

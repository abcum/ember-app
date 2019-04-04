import Helper from '@ember/component/helper';

export default Helper.extend({

	compute() {
		return window.ELECTRON;
	}

});

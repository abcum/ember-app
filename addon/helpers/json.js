import Helper from '@ember/component/helper';

export default Helper.extend({

	compute([value], { spaces = 0 }) {
		return JSON.stringify(value, null, spaces);
	},

});

import Helper from '@ember/component/helper';

export default Helper.extend({
	compute([value = 0, single, plural], { count = true }) {

		let total = Number(value) || 0;

		switch (total) {
		default:
			return count ? `${total} ${plural}` : plural;
		case 1:
			return count ? `${total} ${single}` : single;
		}

	},
});

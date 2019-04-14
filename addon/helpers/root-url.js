import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

	rooturl: inject(),

	compute([path]) {
		return this.get('rooturl').build(path);
	},
});

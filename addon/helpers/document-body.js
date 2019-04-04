import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

	document: inject('-document'),

	compute() {
		return this.get('document').body;
	}

});

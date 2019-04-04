import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

	document: inject('-document'),

	compute(val) {
		return this.get('document').getElementsByTagName(val)[0];
	}

});

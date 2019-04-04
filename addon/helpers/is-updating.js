import Helper from '@ember/component/helper';
import { observer } from '@ember/object';

export default Helper.extend({

	changed: observer('object.isUpdating', function() {
		this.recompute();
	}),

	compute([object]) {
		this.set('object', object);
		return this.get('object.isUpdating');
	},

});

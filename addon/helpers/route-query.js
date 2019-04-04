import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { inject } from '@ember/service';

export default Helper.extend({

	router: inject(),

	changed: observer('router.currentURL', function() {
		this.recompute();
	}),

	compute() {
		let vars = this.get('router.currentURL').split('?')[1] || '';
		return vars.split('&').filter(p => p).reduce( (o, p) => {
			let bit = p.split('=');
			let key = decodeURIComponent(bit[0]);
			let val = decodeURIComponent(bit[1]) || null;
			o[key] = val;
			return o;
		}, {});
	}

});

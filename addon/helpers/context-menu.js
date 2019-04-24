import Helper from '@ember/component/helper';
import { inject } from '@ember/service';
import { typeOf } from '@ember/utils';

export default Helper.extend({

	contextmenu: inject(),

	compute([name], { model }) {
		return (event, ...params) => {

			model = params.length ? params[0] : null;

			params.forEach(param => {
				if ( typeOf(param) === 'instance' ) {
					model = param;
				}
			});

			return this.get('contextmenu').show(event, name, model);

		};
	}

});

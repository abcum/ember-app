import Service from '@ember/service';
import { inject } from '@ember/service';
import features from '../utils/features';

export default class extends Service {

	@inject router;

	constructor() {

		super(...arguments);

		if (features.fastboot() === true) return;

		this.router.on('routeDidChange', () => {
			window.scrollTo({ top: 0, left: 0 });
		});

	}

}

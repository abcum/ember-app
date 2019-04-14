import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	click() {},

	shareurl: computed('url', function() {
		let url = this.get('url');
		return `fb-messenger://share?link=${url}`;
	}),

});

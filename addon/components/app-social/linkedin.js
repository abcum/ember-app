import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	shareurl: computed('url', function() {
		let url = this.get('url');
		return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
	}),

});

import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	shareurl: computed('url', function() {
		let url = this.get('url');
		return `https://facebook.com/sharer/sharer.php?u=${url}`;
	}),

});

import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	shareurl: computed('media', 'url', 'description', function() {
		let media = this.get('media');
		let url = this.get('url');
		let description = this.get('description');
		return `https://pinterest.com/pin/create/bookmarklet/?media=${media}&url=${url}&description=${description}`;
	}),

});

import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	shareurl: computed('url', 'text', 'via', 'hashtags', function() {
		let url = this.get('url');
		let text = this.get('text');
		let via = this.get('via');
		let hashtags = this.get('hashtags');
		return `https://twitter.com/share?url=${url}&text=${text}&via=${via}&hashtags=${hashtags}`;
	}),

});

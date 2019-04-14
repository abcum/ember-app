import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	click() {},

	shareurl: computed('to', 'subject', 'url', function() {
		let to = this.get('to');
		let subject = this.get('subject');
		let body = this.get('body');
		return `mailto:${to}?subject=${subject}&body=${body}`;
	}),

});

import Social from './base';
import { computed } from '@ember/object';

export default Social.extend({

	click() {},

	shareurl: computed('url', 'text', function() {
		let url = this.get('url');
		let text = this.get('text');
		return `tg://msg?text=${url} ${text}`;
	}),

});

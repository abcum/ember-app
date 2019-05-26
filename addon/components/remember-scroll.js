import Component from '@ember/component';

let scrolls = new Object();

export default Component.extend({

	didInsertElement() {
		this._super(...arguments);
		let key = this.get('key');
		let pos = scrolls[key] || 0;
		window.scrollTo(0, pos);
	},

	willDestroyElement() {
		let key = this.get('key');
		let pos = window.scrollY;
		scrolls[key] = pos;
		this._super(...arguments);
	},

});

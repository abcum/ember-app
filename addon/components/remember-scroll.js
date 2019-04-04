import Component from '@ember/component';

let scrolls = new Object();

export default Component.extend({

	didInsertElement() {
		this._super(...arguments);
		let key = this.get('key');
		let pos = scrolls[key] || 0;
		document.scrollTop = pos;
	},

	willDestroyElement() {
		let key = this.get('key');
		let pos = document.scrollTop;
		scrolls[key] = pos;
		this._super(...arguments);
	},

});

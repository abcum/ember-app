import Component from '@ember/component';
import ScrollMixin from '../../mixins/scroll';

let scrolls = new Object();

export default Component.extend(ScrollMixin, {

	tagName: 'app-gridlist-view',

	didInsertElement() {
		this._super(...arguments);
		let key = this.get('name');
		let pos = scrolls[key] || 0;
		this.element.scrollTop = pos;
	},

	willDestroyElement() {
		let key = this.get('name');
		let pos = this.element.scrollTop;
		scrolls[key] = pos;
		this._super(...arguments);
	},

	didScrollElement(e) {
		this._super(...arguments);
		let t = e.target.scrollTop;
		let l = e.target.scrollLeft;
		this.get('scrollChange')(l, t);
	},

});

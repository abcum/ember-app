import Mixin from '@ember/object/mixin';

export default Mixin.create({

	init() {

		this._super(...arguments);

		this.didScrollHandler = (e => {
			this.didScrollElement(e);
		}).bind(this);

	},

	didScrollElement() {},

	didInsertElement() {

		this._super(...arguments);

		this.element.addEventListener("scroll", this.didScrollHandler);

	},

	willDestroyElement() {

		this.element.removeEventListener('resize', this.didScrollHandler);

		this._super(...arguments);

	},

});

import Mixin from '@ember/object/mixin';

export default Mixin.create({

	styleBindings: [],

	didRender() {

		this._super(...arguments);

		this.get('styleBindings').forEach(binding => {

			let part = binding.split(':');
			let show = part[1] || part[0];
			let prop = part[0];

			let val = this.get(prop);
			let num = parseInt(val);

			if (num) {
				this.element.style[show] = num + 'px';
			} else {
				this.element.style[show] = val;
			}

		}, this);

	},

});

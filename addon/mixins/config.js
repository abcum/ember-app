import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

export default Mixin.create({

	init() {

		this._super(...arguments);

		this.config = getOwner(this).lookup('config:ember-app');

	},

});

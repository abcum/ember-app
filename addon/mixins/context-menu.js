import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';

export default Mixin.create({

	contextmenu: inject(),

	click(e) {

		if (e.ctrlKey === true) {

			let data = this.get('model');

			let name = this.get('menu') || this.get('menuName');

			return this.get('contextmenu').show(e, name, data);

		}

	},

	contextMenu(e) {

		let data = this.get('model');

		let name = this.get('menu') || this.get('menuName');

		return this.get('contextmenu').show(e, name, data);

	},

});

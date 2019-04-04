import Storage from "../classes/storage";
import Service from '@ember/service';
import isNum from '../utils/is-num';
import isJson from "../utils/is-json";

const Store = new Storage();

export default Service.extend({

	init() {

		this._super(...arguments);

		if (window && window.addEventListener) {
			window.addEventListener('storage', (e) => {
				this.notifyPropertyChange(e.key);
			});

		}

	},

	unknownProperty(key) {

		let value = Store.getItem(key) || undefined;

		if ( value === 'true' ) {
			return Boolean(true);
		}

		if ( value === 'false' ) {
			return Boolean(false);
		}

		if ( isNum(value) ) {
			return Number(value);
		}

		if ( isJson(value) ) {
			return JSON.parse(value) || {};
		}

		return value;

	},

	setUnknownProperty(key, value) {

		if (value === null) {
			Store.removeItem(key);
			return this.notifyPropertyChange(key);
		}

		if (value === true) {
			Store.setItem(key, value);
			return this.notifyPropertyChange(key);
		}

		if (value === false) {
			Store.setItem(key, value);
			return this.notifyPropertyChange(key);
		}

		if (typeof value === 'string') {
			Store.setItem(key, value);
			return this.notifyPropertyChange(key);
		}

		if (typeof value === 'number') {
			Store.setItem(key, value);
			return this.notifyPropertyChange(key);
		}

		if (typeof value === 'object') {
			Store.setItem(key, JSON.stringify(value));
			return this.notifyPropertyChange(key);
		}

	},

});

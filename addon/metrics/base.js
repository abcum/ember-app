import EmberObject from '@ember/object';
import { assert } from '@ember/debug';

export default EmberObject.extend({

	name: 'base',

	load() {
		assert(`${this.toString()} must implement the load hook!`);
	},

	willDestroy() {
		assert(`${this.toString()} must implement the willDestroy hook!`);
	},

	toString() {
		return `metric:${this.name}`;
	},

	clear() {},

	identify(/*id, data*/) {},

	trackPage(/*data*/) {},

	trackEvent(/*name, data*/) {},

});

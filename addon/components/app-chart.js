import Component from '@ember/component';
import Chart from 'chart.js';

export default Component.extend({

	tagName: 'canvas',

	attributeBindings: ['width', 'height'],

	didInsertElement() {

		this._super(...arguments);

		let data = this.get('data');
		let type = this.get('type');
		let options = this.get('options');
		let element = this.get('element');

		this.chart = new Chart(element, {
			type, data, options,
		});

	},

	willDestroyElement() {

		this.get('chart').destroy();

		this._super(...arguments);

	},

	didUpdateAttrs() {

		this._super(...arguments);

		let data = this.get('data');
		let chart = this.get('chart');
		let options = this.get('options');
		let animate = this.get('animate');

		if (chart) {
			chart.config.data = data;
			chart.config.options = options;
			animate ? chart.update() : chart.update(0);
		}

	},

});

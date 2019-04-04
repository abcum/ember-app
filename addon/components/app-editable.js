import Component from '@ember/component';

export default Component.extend({

	tagName: 'app-editable',

	value: '',

	onChangeText() {},

	onChangeHtml() {},

	spellcheck: 'true',

	autocorrect: 'true',

	autocapitalize: 'true',

	contenteditable: 'true',

	attributeBindings: [
		'autocapitalize',
		'autocorrect',
		'contenteditable',
		'placeholder',
		'spellcheck',
	],

	didInsertElement() {

		this._super(...arguments);

		this.element.innerHTML = this.get('value');

	},

	input() {

		this._super(...arguments);

		this.get('onChangeHtml')(this.element.innerHTML);

		this.get('onChangeText')(this.element.textContent);

	},

});

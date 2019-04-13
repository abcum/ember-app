import Component from '@ember/component';

export default Component.extend({

	tagName: 'input',

	type: "file",

	tabindex: "-1",

	multiple: "true",

	attributeBindings: [
		'type',
		'multiple',
		'tabindex',
	],

});

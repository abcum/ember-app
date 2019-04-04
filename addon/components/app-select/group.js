import Component from '@ember/component';

export default Component.extend({

	tagName: 'optgroup',

	attributeBindings: [
		'title',
		'label',
		'disabled',
	],

});

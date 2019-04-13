import TextField from '@ember/component/text-field';

export default TextField.extend({

	type: 'number',

	attributeBindings: [
		'type',
		'min',
		'max',
	],

});

import TextField from '@ember/component/text-field';

export default TextField.extend({

	type: 'date',

	attributeBindings: [
		'type',
		'min',
		'max',
	],

});

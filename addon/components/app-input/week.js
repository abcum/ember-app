import TextField from '@ember/component/text-field';

export default TextField.extend({

	type: 'week',

	attributeBindings: [
		'type',
		'min',
		'max',
	],

});

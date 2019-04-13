import TextField from '@ember/component/text-field';

export default TextField.extend({

	type: 'password',

	attributeBindings: [
		'type',
	],

});

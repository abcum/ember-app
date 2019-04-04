import Component from '@ember/component';
import layout from '../../templates/components/app-dropdown/group';

export default Component.extend({

	layout,

	tagName: 'app-dropdown-group',

	attributeBindings: [
		'title',
		'label',
		'disabled',
	],

});

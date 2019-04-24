import Component from '@ember/component';
import StylesMixin from '../../mixins/styles';

export default Component.extend(StylesMixin, {

	tagName: 'app-gridlist-area',

	width: 0,

	height: 0,

	styleBindings: Object.freeze([
		'width',
		'height',
	]),

});

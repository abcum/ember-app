import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import ViewportMixin from '../mixins/viewport';
import layout from "../templates/components/app-image";

export default Component.extend(ViewportMixin, StylesMixin, {

	tagName: 'app-image',

	layout,

	alt: null,

	src: null,

	lqip: null,

	sizes: null,

	srcset: null,

	width: null,

	height: null,

	attributeBindings: [
		'lqip',
		'visible',
	],

	styleBindings: Object.freeze([
		'width',
		'height',
	]),

	didEnterViewport() {
		this._super(...arguments);
		this.set('visible', true);
	},

});

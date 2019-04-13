import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import ResizeMixin from '../mixins/resize';
import ViewportMixin from '../mixins/viewport';
import layout from "../templates/components/app-frame";

export default Component.extend(ViewportMixin, StylesMixin, ResizeMixin, {

	tagName: 'app-frame',

	layout,

	src: null,

	zoom: 1,

	width: '100%',

	height: '100%',

	interactive: false,

	attributeBindings: [
		'interactive',
	],

	styleBindings: Object.freeze([
		'width',
		'height',
	]),

	didInsertElement() {
		this._super(...arguments);
		this.set('frame', this.element.offsetWidth);
	},

	didResizeElement() {
		this._super(...arguments);
		this.set('frame', this.element.offsetWidth);
	},

	didEnterViewport() {
		this._super(...arguments);
		this.set('visible', true);
	},

	didLeaveViewport() {
		this._super(...arguments);
		this.set('visible', false);
	},

});

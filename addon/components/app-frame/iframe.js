import Component from '@ember/component';
import StylesMixin from '../../mixins/styles';
import { computed } from '@ember/object';

export default Component.extend(StylesMixin, {

	tagName: 'iframe',

	src: null,

	frameborder: "0",

	sandbox: "allow-same-origin allow-scripts",

	attributeBindings: [
		'src',
		'sandbox',
		'frameborder',
	],

	styleBindings: Object.freeze([
		'width',
		'height',
		'transform',
		'transform:oTransform',
		'transform:msTransform',
		'transform:mozTransform',
		'transform:khtmlTransform',
		'transform:webkitTransform',
	]),

	scale: computed('zoom', 'frame', function() {
		let z = this.get('zoom');
		let f = this.get('frame');
		return Math.min(1, f / z);
	}),

	perct: computed('scale', function() {
		let s = this.get('scale');
		return Math.max(100, (1 / s) * 100);
	}),

	width: computed('perct', function() {
		return `${this.get('perct')}%`;
	}),

	height: computed('perct', function() {
		return `${this.get('perct')}%`;
	}),

	transform: computed('scale', function() {
		return `scale(${this.get('scale')})`;
	}),

});

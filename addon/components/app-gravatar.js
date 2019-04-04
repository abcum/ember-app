import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import image from '../utils/avatar';
import md5 from "../utils/md5";

export default Component.extend(StylesMixin, {

	tagName: 'app-gravatar',

	size: 80,

	image: '',

	attributeBindings: [
		'circular',
	],

	styleBindings: Object.freeze([
		'size:width',
		'size:height',
		'image:background-image',
	]),

	didReceiveAttrs() {

		this._super(...arguments);

		let s = this.get('size');
		let e = md5(this.get('email'));

		let i = `https://secure.gravatar.com/avatar/${e}?s=${s}&d=404`;
		let d = `data:image/svg+xml;base64,${image}`;

		this.set('image', `url('${i}'), url('${d}')`);

		this.set('src', i);

	},

});

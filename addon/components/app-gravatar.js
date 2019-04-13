import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import { computed } from '@ember/object';
import avatar from '../utils/avatar';
import md5 from "../utils/md5";

export default Component.extend(StylesMixin, {

	tagName: 'app-gravatar',

	size: 80,

	attributeBindings: [
		'circular',
	],

	styleBindings: Object.freeze([
		'size:width',
		'size:height',
		'image:background-image',
	]),

	md5: computed('email', function() {
		return md5(this.get('email'));
	}),

	err: computed('gender', function() {
		let g = this.get('gender') || 'm';
		return `data:image/svg+xml;base64,${avatar[g]}`;
	}),

	src: computed('md5', 'size', function() {
		let e = this.get('md5');
		let s = this.get('size');
		return `https://secure.gravatar.com/avatar/${e}?s=${s}&d=404`;
	}),

	image: computed('err', 'src', function() {
		let s = this.get('src');
		let e = this.get('err');
		return `url('${s}'), url('${e}')`;
	}),

});

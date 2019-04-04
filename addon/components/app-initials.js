import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import initials from '../utils/initials';
import hashcode from '../utils/hashcode';
import { computed } from '@ember/object';
import layout from '../templates/components/app-initials';

const COLOURS = [
	'#1abc9c', '#16a085', '#f1c40f',
	'#f39c12', '#2ecc71', '#27ae60',
	'#e67e22', '#d35400', '#3498db',
	'#2980b9', '#e74c3c', '#c0392b',
	'#9b59b6', '#8e44ad', '#bdc3c7',
	'#34495e', '#2c3e50', '#95a5a6',
	'#7f8c8d', '#ec87bf', '#d870ad',
	'#f69785', '#9ba37e', '#b49255',
	'#b49255', '#a94136', '#5461b4',
];

export default Component.extend(StylesMixin, {

	layout,

	tagName: 'app-initials',

	size: 80,

	default: '?',

	attributeBindings: [
		'circular',
	],

	styleBindings: Object.freeze([
		'size:width',
		'size:height',
		'color:background-color',
	]),

	color: computed('name', function() {
		let name = this.get('name');
		return COLOURS[hashcode(name, COLOURS.length)];
	}),

	initials: computed('name', 'default', function() {
		let name = this.get('name');
		return initials(name) || this.get('default');
	}),

});

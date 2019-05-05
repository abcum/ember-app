import Component from '@ember/component';
import { computed } from '@ember/object';
import StylesMixin from '../mixins/styles';
import layout from '../templates/components/app-network';
import vis from 'vis.js';

export default Component.extend(StylesMixin, {

	layout,

	width: '100%',

	height: '100%',

	styleBindings: Object.freeze([
		'width',
		'height',
	]),

	nodes: computed(function() {
		return new vis.DataSet([]);
	}),

	edges: computed(function() {
		return new vis.DataSet([]);
	}),

	options: computed(function() {
		return {};
	}),

	didInsertElement() {

		this._super(...arguments);

		this.network = new vis.Network(this.element, {
			nodes: this.get('nodes'),
			edges: this.get('edges'),
		}, this.get('options'));

		this.network.on('zoom', (properties) => {
			// eslint-disable-next-line ember/closure-actions
			this.sendAction('on-zoom', properties);
		});

		this.network.on('select', (properties) => {
			this.get('nodes').get(properties.nodes).forEach(node => {
				if (node['on-select']) node['on-select'](properties.event);
			});
			this.get('edges').get(properties.edges).forEach(edge => {
				if (edge['on-select']) edge['on-select'](properties.event);
			});
		});

		this.network.on('click', (properties) => {
			// eslint-disable-next-line ember/closure-actions
			this.sendAction('on-click', properties);
			this.get('nodes').get(properties.nodes).forEach(node => {
				if (node['on-click']) node['on-click'](properties.event);
			});
			this.get('edges').get(properties.edges).forEach(edge => {
				if (edge['on-click']) edge['on-click'](properties.event);
			});
		});

		this.network.on('doubleClick', (properties) => {
			// eslint-disable-next-line ember/closure-actions
			this.sendAction('on-dblclick', properties);
			this.get('nodes').get(properties.nodes).forEach(node => {
				if (node['on-dblclick']) node['on-dblclick'](properties.event);
			});
			this.get('edges').get(properties.edges).forEach(edge => {
				if (edge['on-dblclick']) edge['on-dblclick'](properties.event);
			});
		});

		this.network.on('oncontext', (properties) => {
			// eslint-disable-next-line ember/closure-actions
			this.sendAction('on-contextmenu', properties);
			this.get('nodes').get(properties.nodes).forEach(node => {
				if (node['on-contextmenu']) node['on-contextmenu'](properties.event);
			});
			this.get('edges').get(properties.edges).forEach(edge => {
				if (edge['on-contextmenu']) edge['on-contextmenu'](properties.event);
			});
		});

	},

	willDestroyElement() {

		this.get('network').destroy();

		this._super(...arguments);

	},

	didUpdateAttrs() {

		this._super(...arguments);

		this.get('network').setOptions( this.get('options') );

	},

	actions: {

		registerNode(item) {
			this.get('nodes').add(item);
		},

		registerEdge(item) {
			this.get('edges').add(item);
		},

		unregisterNode(item) {
			this.get('nodes').remove(item);
		},

		unregisterEdge(item) {
			this.get('edges').remove(item);
		},

		reregisterNode(item) {
			this.get('nodes').update(item);
		},

		reregisterEdge(item) {
			this.get('edges').update(item);
		},

	},

});

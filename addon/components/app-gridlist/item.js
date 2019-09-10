import Component from '@ember/component';
import StylesMixin from '../../mixins/styles';

export default Component.extend(StylesMixin, {

	tagName: 'app-gridlist-item',

	top: 0,

	left: 0,

	width: 0,

	height: 0,

	onClick() {},

	onDoubleClick() {},

	onContextMenu() {},

	styleBindings: Object.freeze([
		'top',
		'left',
		'width',
		'height',
	]),

	attributeBindings: [
		'kind',
		'selected',
	],

	classNameBindings: [
		'selected:selected:deselected'
	],

	didReceiveAttrs() {

		let id = this.get('model.id');

		let se = [].concat(this.selection).find(i => i.id == id);

		this.set('selected', se);

		if (this.kind === 'list') {

			let o = this.getProperties('rowH', 'index');
			let y = o.rowH * o.index;

			this.setProperties({
				top: `${y}px`,
				width: '100%',
				height: `${o.rowH}px`,
			});

		}

		if (this.kind === 'grid') {

			let o = this.getProperties('w', 'cols', 'colW', 'rowH', 'index', 'total');

			// Detect if the items are visible on a single row, or multiple rows
			let s = o.w / o.colW > o.total;

			// Work out position from left
			let p = o.index % o.cols;

			// Work out remaining space
			let r = o.w - ( o.colW * o.cols );

			// Work out extra gap between items
			let g = r / (o.cols+1);

			// Work out X and Y
			let x = s ? p * o.colW : p * o.colW + (p+1) * g;
			let y = Math.floor(o.index / o.cols) * o.rowH;

			this.setProperties({
				top: `${y}px`,
				left: `${x}px`,
				width: `${o.colW}px`,
				height: `${o.rowH}px`,
			});

		}

		this._super(...arguments);

	},

	click(e) {
		this.get('onClick')(e, this);
		return false;
	},

	doubleClick(e) {
		this.get('onDoubleClick')(e, this);
		return false;
	},

	contextMenu(e) {
		this.get('onContextMenu')(e, this);
		return false;
	},

});

import Component from '@ember/component';
import { A } from '@ember/array';
import O from '@ember/object';
import { computed } from '@ember/object';
import { run, later, cancel } from '@ember/runloop';
import ResizeMixin from '../mixins/resize';
import range from '../utils/int-range';
import layout from '../templates/components/app-gridlist';

export default Component.extend(ResizeMixin, {

	tagName: 'app-gridlist',

	layout,

	total: 0,

	colWidth: 0,

	rowHeight: 0,

	onClick() {},

	onDoubleClick() {},

	onContextMenu() {},

	kind: computed('colWidth', function() {
		return this.get('colWidth') ? 'grid' : 'list';
	}),

	init() {
		this._super(...arguments);
		this.items = A();
		this.selection = A();
		this.confs = {
			c: 0, // item count
			d: { w: 0, h: 0 }, // view dimensions
			e: { w: 0, h: 0 }, // estimated sizes
			s: { l: 0, t: 0 }, // scroll positions
			v: { w: 0, h: 0 }, // scroll view dimensions
			i: { w: 0, h: 0 }, // scroll view item dimensions
		};
	},

	didReceiveAttrs() {
		this._super(...arguments);
		this.setProperties({
			'confs.c': this.get('total'),
			'confs.i.w': this.get('colWidth'),
			'confs.i.h': this.get('rowHeight'),
			'confs.e.w': this.get('estimated.w'),
			'confs.e.h': this.get('estimated.h'),
		});
		this.setup();
	},

	didInsertElement() {
		this._super(...arguments);
		this.setProperties({
			'confs.d.w': this.element.clientWidth,
			'confs.d.h': this.element.clientHeight,
		});
		this.setup();
	},

	didResizeElement() {
		this._super(...arguments);
		this.setProperties({
			'confs.d.w': this.element.clientWidth,
			'confs.d.h': this.element.clientHeight,
		});
		this.setup();
	},

	setup() {

		// Total items
		let colW = this.confs.i.w;
		let rowH = this.confs.i.h;

		let boxW = this.confs.d.w || this.confs.e.w;
		let boxH = this.confs.d.h || this.confs.e.h;

		// Total visible columns
		let cols = 1;
		cols = colW ? Math.floor( boxW / colW ) : cols;
		cols = colW ? Math.max(1, cols) : cols;
		this.set('cols', cols);

		// Total visible rows
		let rows = 1;
		rows = rowH ? Math.ceil( boxH / rowH ) + 1 : rows;
		rows = rowH ? Math.max(1, rows) : rows;
		this.set('rows', rows);

		// Total div scrollheight
		let h = Math.ceil(this.confs.c / cols) * rowH;

		this.set('confs.v', {
			w: '100%',
			h: `${h}px`,
		});

		// Display the items
		this.scroll();

	},

	scroll() {

		// Total items
		let rowH = this.confs.i.h;

		// Number of beginning item
		let brw = 0;
		brw = Math.floor( this.confs.s.t / rowH );

		// Number of finishing item
		let frw = 0;
		frw = Math.floor( brw + ( this.rows - 1 ) ) + 1;

		// Index of beginning item
		let bix = 0;
		bix = Math.min(this.confs.c, brw * this.cols);
		this.bix = bix;

		// Index of finishing item
		let fix = 0;
		fix = Math.min(this.confs.c, frw * this.cols);
		this.fix = fix;

		// Check if moved on
		if (this.cix == this.bix) return;
		this.cix = this.bix;

		// Difference of ids
		let sub = this.fix - this.bix;

		// Difference of rows
		let dif = sub - this.items.length;

		// Remove any extra item placeholders
		if (dif < 0) {
			for ( let i = 0; i > dif; --i ) {
				this.items.popObject();
			}
		}

		// Add necessary item placeholders
		if (dif > 0) {
			for ( let i = 0; i < dif; i++ ) {
				this.items.pushObject( O.create() );
			}
		}

		// Array of ids for rows to be loaded
		let ids = Array(sub).fill().map( (v, k) => k + this.bix );

		// Change placeholder content
		ids.forEach(i => {
			let pos = i % sub;
			let obj = this.items.objectAt(pos);
			obj.setProperties({
				index: i,
				content: A(this.content).objectAt(i, true),
			});
		});

		// Fetch and change placeholder content
		run( () => this.change(bix, fix, sub, ids) );

	},

	change(bix, fix, sub, ids) {

		cancel(this.timer);

		this.timer = later( () => {

			if (this.bix !== bix) return;

			ids.forEach(i => {
				let pos = i % sub;
				let obj = this.items.objectAt(pos);
				obj.setProperties({
					index: i,
					content: A(this.content).objectAt(i, false),
				});
			});

		}, 500);

	},

	click() {
		this.select(null, { reset: true });
	},

	select(item, options) {

		if (options.toggle) {
			if (this.selection.includes(item.index)) {
				this.selection.removeObject(item.index);
			} else {
				this.selection.addObject(item.index);
			}
		}

		if (options.range) {
			let idx = range(item.index, this.cursor);
			this.selection.addObjects(idx);
		}

		if (options.single) {
			this.selection.clear();
			this.selection.addObject(item.index);
		}

		if (options.reset) {
			this.selection.clear();
		}

		this.cursor = item ? item.index : null;

		this.notifyPropertyChange('selection');

		this.get('onSelect')(this.selection);

	},

	actions: {

		scrollChange(l, t) {
			if (l !== this.confs.s.l || t !== this.confs.s.t) {
				this.set('confs.s', { l, t });
				this.scroll();
			}
		},

		onClick(e, item) {

			if (e.shiftKey) {
				this.select(item, { range: true });
			}

			if (e.metaKey || e.altKey) {
				this.select(item, { toggle: true });
			}

			if (!e.metaKey && !e.altKey && !e.shiftKey) {
				this.select(item, { single: true });
			}

			if (!e.metaKey && !e.altKey && !e.shiftKey) {
				this.get('onClick')(e, item.model);
			}

		},

		onDoubleClick(e, item) {

			if (e.shiftKey) {
				this.select(item, { range: true });
			}

			if (e.metaKey || e.altKey) {
				this.select(item, { toggle: true });
			}

			if (!e.metaKey && !e.altKey && !e.shiftKey) {
				this.select(item, { single: true });
			}

			if (!e.metaKey && !e.altKey && !e.shiftKey) {
				this.get('onDoubleClick')(e, item.model);
			}

		},

		onContextMenu(e, item) {

			this.select(item, { single: true });

			this.get('onContextMenu')(e, item.model);

		},

	}

});

# Gridlist

The `app-gridlist` components adds functionality for working with lists and grids, enabling efficient incremental rendering of large numbers of items in list or grid format, with single click or double click support, and multi-selection support, whilst at the same time re-rendering when the viewport is resized. Each list or grid will display only the necessary number of items to fill the desired layout, rendering other items as and when they are scrolled into view.

### List view

To create a grid view, specify a `rowHeight`. The `content` attribute defines the item content for the full list, and the `total` defines the total number of items. The `estimated` attribute calculates how many items should be rendered if there is no DOM.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-gridlist-list.hbs'}}
		<div class="area">
			{{#app-gridlist
				name='items'
				rowHeight=80
				content=items
				total=items.length
				estimated=(hash w=400 h=1000)
				onSelect=(console 'select')
				onClick=(console 'click')
				onDoubleClick=(console 'doubleclick')
				onContextMenu=(context-menu 'docs/elements/gridlist/menu')
			as |model|}}
				<div class="l">List item</div>
				<div class="r">{{model.id}}</div>
			{{/app-gridlist}}
		</div>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-gridlist-list.hbs'}}
{{/docs-demo}}

### Grid view

To create a grid view, specify both a `rowHeight` attribute, and a `colWidth` attribute. The `content` attribute defines the item content for the full list, and the `total` defines the total number of items. The `estimated` attribute calculates how many items should be rendered if there is no DOM.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-gridlist-grid.hbs'}}
		<div class="area">
			{{#app-gridlist
				name='items'
				colWidth=140
				rowHeight=140
				content=items
				total=items.length
				estimated=(hash w=400 h=1000)
				onSelect=(console 'select')
				onClick=(console 'click')
				onDoubleClick=(console 'doubleclick')
				onContextMenu=(context-menu 'docs/elements/gridlist/menu')
			as |model|}}
				<div class="l">Grid item</div>
				<div class="r">{{model.id}}</div>
			{{/app-gridlist}}
		</div>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-gridlist-grid.hbs'}}
{{/docs-demo}}

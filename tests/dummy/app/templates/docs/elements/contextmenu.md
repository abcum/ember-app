# Contextmenu

The `app-context-menu` component adds functionality for adding contextual shortcut menus to an Ember.js app, using the right click button. A custom context menu can be applied to the whole application, in addition to individual menus for a specific areas, or on an ember component.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-contextmenu.hbs'}}
		{{#right-click menu="application.menu"}}
			Right click me ...
		{{/right-click}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-contextmenu.hbs' label='application.hbs'}}
	{{demo.snippet 'docs-demo-elements-contextmenu-menu.hbs' label='application/menu.hbs'}}
{{/docs-demo}}

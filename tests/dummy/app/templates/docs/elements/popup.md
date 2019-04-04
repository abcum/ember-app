# Popup

The `app-popup` component enables adding popups inline or attached to html elements. Popup elements can be made to appear either when hovering over an item, or when clicking on an item. Popup are able to be hidden when the item is no longer being hovered over, or when the user clicks on another part of the page. In addition pressing the escape key can hide a popup.

## When hovering

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-popup-hover.hbs'}}
		<span>
			Hover over me!
			{{#app-popup side="ne" show="hover" hide="hover"}}
				Here is some more information.
			{{/app-popup}}
		</span>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-popup-hover.hbs'}}
{{/docs-demo}}

## When clicking

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-popup-click.hbs'}}
		<span>
			Click on me!
			{{#app-popup side="ne" show="click" hide="click"}}
				Here is some more information.
			{{/app-popup}}
		</span>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-popup-click.hbs'}}
{{/docs-demo}}

## Hide on escape

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-popup-escape.hbs'}}
		<span>
			Click on me!
			{{#app-popup side="ne" show="click" hide="click escape"}}
				Here is some more information.
			{{/app-popup}}
		</span>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-popup-escape.hbs'}}
{{/docs-demo}}

## Custom class

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-popup-class.hbs'}}
		<span>
			Hover over me!
			{{#app-popup side="ne" show="hover" hide="hover" itemClass="custom"}}
				Here is some more information.
			{{/app-popup}}
		</span>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-popup-class.hbs'}}
{{/docs-demo}}

## Attach to element

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-popup-target.hbs'}}
		<span id="clicker">Hover over me</span>
		{{#app-popup side="ne" show="hover" hide="hover" target="clicker"}}
			Here is some more information.
		{{/app-popup}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-popup-target.hbs'}}
{{/docs-demo}}

## Tooltip direction

{{#docs-demo as |demo|}}

	{{#demo.example name='docs-demo-popup-direction.hbs'}}

		<span float-r>
			{{#app-select value=side select=(action (mut side)) as |input|}}
				{{input.option value="n" label="Top"}}
				{{input.option value="nw" label="Top left"}}
				{{input.option value="ne" label="Top right"}}
				{{input.option value="w" label="Left"}}
				{{input.option value="e" label="Right"}}
				{{input.option value="s" label="Bottom"}}
				{{input.option value="sw" label="Bottom left"}}
				{{input.option value="se" label="Bottom right"}}
			{{/app-select}}
		</span>

		<span>
			Hover over me!
			{{#app-popup side=side show="hover" hide="hover escape"}}
				Here is some more information.
			{{/app-popup}}
		</span>

	{{/demo.example}}

	{{demo.snippet 'docs-demo-popup-direction.hbs'}}

{{/docs-demo}}

## Custom styling

{{docs-snippet name='docs-demo-popup-styling.scss'}}

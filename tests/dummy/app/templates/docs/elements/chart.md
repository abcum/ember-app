# Chart

The `app-chart` component enables adding [Chart.js](https://www.chartjs.org/) charts to an application.

> This functionality requires the {{#link-to "docs.config"}}`chart`{{/link-to}} plugin to be enabled.

## Bar charts

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-chart-bar.hbs'}}
		{{app-chart type="bar" data=normal.data options=normal.opts}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-chart-bar.hbs'}}
	{{demo.snippet 'docs-demo-elements-chart-normal.js'}}
{{/docs-demo}}

## Line charts

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-chart-line.hbs'}}
		{{app-chart type="line" data=normal.data options=normal.opts}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-chart-line.hbs'}}
	{{demo.snippet 'docs-demo-elements-chart-normal.js'}}
{{/docs-demo}}

## Pie charts

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-chart-pie.hbs'}}
		{{app-chart type="pie" data=normal.data options=normal.opts}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-chart-pie.hbs'}}
	{{demo.snippet 'docs-demo-elements-chart-normal.js'}}
{{/docs-demo}}

## Doughnut charts

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-chart-doughnut.hbs'}}
		{{app-chart type="doughnut" data=normal.data options=normal.opts}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-chart-doughnut.hbs'}}
	{{demo.snippet 'docs-demo-elements-chart-normal.js'}}
{{/docs-demo}}

## Polar charts

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-chart-polar.hbs'}}
		{{app-chart type="polarArea" data=normal.data options=normal.opts}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-chart-polar.hbs'}}
	{{demo.snippet 'docs-demo-elements-chart-normal.js'}}
{{/docs-demo}}

## Bubble charts

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-chart-bubble.hbs'}}
		{{app-chart type="bubble" data=bubble.data options=bubble.opts}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-chart-bubble.hbs'}}
	{{demo.snippet 'docs-demo-elements-chart-bubble.js'}}
{{/docs-demo}}

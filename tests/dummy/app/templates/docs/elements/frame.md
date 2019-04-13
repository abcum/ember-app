# Frame

The `app-frame` component can be used to add scaled iframes to an Ember application, for preview, or embedding purposes.

## Preview frame

To create a page thumbnail, specify the `width` and `height` of the thumbnail, and specify the url of the page using the `src` attribute.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-frame-basic.hbs'}}
		{{app-frame src=url width="300px" height="400px"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-frame-basic.hbs'}}
	{{demo.snippet 'docs-demo-elements-frame.js'}}
{{/docs-demo}}

## Custom device size

To change the device width, with which the page is loaded, by specifying the `zoom` attribute.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-frame-zoom.hbs'}}
		{{app-frame src=url zoom=1200 width="300px" height="400px"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-frame-zoom.hbs'}}
	{{demo.snippet 'docs-demo-elements-frame.js'}}
{{/docs-demo}}

## Interactive frame

To enable interactivity with the frame, you can specify the `interactive` attribute.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-frame-remote.hbs'}}
		{{app-frame src=url zoom=480 width="100%" height="900" interactive=true}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-frame-remote.hbs'}}
	{{demo.snippet 'docs-demo-elements-frame.js'}}
{{/docs-demo}}

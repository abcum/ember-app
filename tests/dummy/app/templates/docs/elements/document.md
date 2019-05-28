# Document

The `app-document` component adds functionlity for loading, rendering and deplaying the pages of a PDF document inside an Ember.js app. The component uses PDFJS to load and render the PDF document using background web-worker threads, without increasing the size of the Ember.js app.

## Basic document

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-document.hbs'}}
		<div style="height:800px; position:relative;">
			{{app-document page=1 url=(route-url "/test.pdf")}}
		</div>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-document.hbs'}}
{{/docs-demo}}

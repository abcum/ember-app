# Editable

The `app-editable` component enables {{app-editable value="inline"}} editing of a contenteditable div, for use as an input area. When the value is edited, it is possible to extract either the text content, or the html content of the element. When requesting the text content, all additional markup (e.g. bold, italics, strikethrough, line-breaks) is removed from the returned value, leaving only the text content of the editable element. When requesting the html content, all additional markup (e.g. bold, italics, strikethrough, line-breaks) is returned along with the returned value, resulting in the properly formatted html content of the editable element.

## Getting the text content

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-editable-text.hbs'}}
		{{app-editable value=text onChangeText=(action (mut text))}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-editable-text.hbs'}}
	{{demo.snippet 'docs-demo-elements-editable-text.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-editable-text-view.hbs'}}
		{{text}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-editable-text-view.hbs'}}
{{/docs-demo}}

## Getting the html content

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-editable-html.hbs'}}
		{{app-editable value=html onChangeHtml=(action (mut html))}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-editable-html.hbs'}}
	{{demo.snippet 'docs-demo-elements-editable-html.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-editable-html-view.hbs'}}
		{{html}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-editable-html-view.hbs'}}
{{/docs-demo}}

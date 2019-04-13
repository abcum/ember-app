# Droppable

The `app-droppable` component enables file import / upload functionality in an Ember application, using drag-and-drop or a file select box. When the droppable area is clicked, a file chooser popup window will appear, enabling files to be selected from the user's computer.

## Basic

When a file is selected, or when dropped onto the droppable area, the file is processed and sent via the `onOpen` action to the parent component.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-droppable-basic.hbs'}}
		{{app-droppable height="300" onOpen=(console 'File uploaded')}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-droppable-basic.hbs'}}
{{/docs-demo}}

## Advanced

To enable a more advanced interface, the `app-droppable` component can be used in block form. The `dropping` property is true when a file is being dragged over the area. If no files are being loaded then the `waiting` property is true, and if a file is being processed then the `loading` property will be true.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-droppable-block.hbs'}}
		{{#app-droppable height="300" onOpen=(console 'File uploaded') as |d|}}
			{{#if d.dropping}}
				<br> Drop your files here.
			{{else}}
				{{#if d.waiting}}
					<br> Drag your files here.
				{{/if}}
				{{#if d.loading}}
					<br> Processing your files.
				{{/if}}
			{{/if}}
		{{/app-droppable}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-droppable-block.hbs'}}
{{/docs-demo}}

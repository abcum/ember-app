# Keyboard helpers

The keyboard helpers enable events in response to key presses.

## hot-key

Bind an action to an event whenever a keyboard key is pressed.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-keyboard-hot-key-default'}}
		Go ahead and press **b**.
		{{!-- BEGIN-SNIPPET docs-demo-helpers-keyboard-hot-key-default.hbs --}}
		{{hot-key
			key="b"
			onPress=(alert "You pressed b")
		}}
		{{!-- END-SNIPPET --}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-keyboard-hot-key-default.hbs'}}
{{/docs-demo}}

Or when a series of keys is pressed together.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-keyboard-hot-key-control'}}
		Go ahead and press **command+b**.
		{{!-- BEGIN-SNIPPET docs-demo-helpers-keyboard-hot-key-control.hbs --}}
		{{hot-key
			key="b"
			meta=true
			onPress=(alert "You pressed command+b")
		}}
		{{!-- END-SNIPPET --}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-keyboard-hot-key-control.hbs'}}
{{/docs-demo}}

Or specify keys using special modifier names.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-keyboard-hot-key-backspace'}}
		Go ahead and press **command+backspace**.
		{{!-- BEGIN-SNIPPET docs-demo-helpers-keyboard-hot-key-backspace.hbs --}}
		{{hot-key
			meta=true
			key="backspace"
			onPress=(alert "You pressed command+backspace")
		}}
		{{!-- END-SNIPPET --}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-keyboard-hot-key-backspace.hbs'}}
{{/docs-demo}}

# Modal

The `app-modal` component enables adding modal windows over the top of a web page.

## When hovering

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-modal-toggle.hbs'}}
		
		<button {{action (action (mut show) (not show))}}>
			Display a modal
		</button>

		{{#if show}}
			{{#app-modal class="custom" close=(action (mut show) (not show))}}
				This is a custom modal window
			{{/app-modal}}
		{{/if}}

	{{/demo.example}}
	{{demo.snippet 'docs-demo-modal-toggle.hbs'}}
{{/docs-demo}}

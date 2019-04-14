# Codemirror

The `app-codemirror` component creates a versatile [Codemirror](http://codemirror.net) code editor block for advanced editing and formatting of programming code. It supports multiple languages and themes, which can be specified for inclusion in the `config/environment.js` file. Advanced features include bracket matching, automatic tag closing, whitespace removal, and block comments.

> This functionality requires the {{#link-to "docs.config"}}`codemirror`{{/link-to}} plugin to be enabled.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-codemirror.hbs'}}
		{{app-codemirror value=value onChange=(action (mut value))}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-codemirror.hbs'}}
	{{demo.snippet 'docs-demo-elements-codemirror.js'}}
{{/docs-demo}}

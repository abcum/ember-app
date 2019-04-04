# Gravatar

The `app-initials` component enables adding user initials icons to an Ember app.

## Basic image

To add an initials icon, specify the name of the user profile. The initials will be generated automatically from the name.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-initials-basic.hbs'}}
		{{app-initials name="Joe Bloggs"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-initials-basic.hbs'}}
{{/docs-demo}}

## Sized image

To change the size of the initials icon, specify the `size` attribute. The default size is `80px`.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-initials-large.hbs'}}
		{{app-initials size="40" name="Tom Smith"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-initials-large.hbs'}}
{{/docs-demo}}

## Circular image

If you want the image to be circular, specify the `circular` attribute as true.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-initials-circular.hbs'}}
		{{app-initials size="40" circular=true name="Simon Langer"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-initials-circular.hbs'}}
{{/docs-demo}}

## Fallback image

If the initials can't be determined as no initials were specified, then a fallback initials icon will be used.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-initials-fallback.hbs'}}
		{{app-initials name=""}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-initials-fallback.hbs'}}
{{/docs-demo}}

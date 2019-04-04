# Gravatar

The `app-gravatar` component enables adding [Gravatar](https://en.gravatar.com) images to an Ember app.

## Basic image

To add a gravatar image, specify the email address of the profile. This value will be hashed using md5 to generate the gravatar url.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-gravatar-basic.hbs'}}
		{{app-gravatar email="info@abcum.com"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-gravatar-basic.hbs'}}
{{/docs-demo}}

## Sized image

To change the size of the avatar image, specify the `size` attribute. The default size is `80px`.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-gravatar-large.hbs'}}
		{{app-gravatar size="40" email="info@abcum.com"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-gravatar-large.hbs'}}
{{/docs-demo}}

## Circular image

If you want the image to be circular, specify the `circular` attribute as true.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-gravatar-circular.hbs'}}
		{{app-gravatar size="40" circular=true email="info@abcum.com"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-gravatar-circular.hbs'}}
{{/docs-demo}}

## Fallback image

If no gravatar image is available with the specified email address, then a fallback avatar image will be used.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-gravatar-fallback.hbs'}}
		{{app-gravatar email="doesnotexist@abcum.com"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-gravatar-fallback.hbs'}}
{{/docs-demo}}

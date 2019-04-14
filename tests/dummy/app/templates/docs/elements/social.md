# Social

The `app-social` components enable the creation of social share links on a number of social platforms, and chat platforms.

## Email

The `app-social/email` component composes an email, with a subject and a body.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-email.hbs'}}
		{{#app-social/email to="info@abcum.com" subject="Test subject" body="Some url to share!"}}
			Share by email
		{{/app-social/email}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-email.hbs'}}
{{/docs-demo}}

## Facebook

The `app-social/facebook` opens up a Facebook popup window.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-facebook.hbs'}}
		{{#app-social/facebook url="https://abcum.com"}}
			Share on Facebook
		{{/app-social/facebook}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-facebook.hbs'}}
{{/docs-demo}}

## LinkedIn

The `app-social/linkedin` opens up a LinkedIn popup window.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-linkedin.hbs'}}
		{{#app-social/linkedin url="https://abcum.com"}}
			Share on LinkedIn
		{{/app-social/linkedin}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-linkedin.hbs'}}
{{/docs-demo}}

## Messenger

The `app-social/messenger` shares a message on Facebook Messenger if it is installed.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-messenger.hbs'}}
		{{#app-social/messenger url="https://abcum.com"}}
			Share on Messenger
		{{/app-social/messenger}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-messenger.hbs'}}
{{/docs-demo}}

## Pinterest

The `app-social/pinterest` opens up a Pinterest popup window.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-pinterest.hbs'}}
		{{#app-social/pinterest media="Software" url="https://abcum.com" description="Abcum Website"}}
			Share on Pinterest
		{{/app-social/pinterest}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-pinterest.hbs'}}
{{/docs-demo}}

## Telegram

The `app-social/telegram` shares a message on Telegram if it is installed.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-telegram.hbs'}}
		{{#app-social/telegram url="https://abcum.com" text="Abcum Website"}}
			Share on Telegram
		{{/app-social/telegram}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-telegram.hbs'}}
{{/docs-demo}}

## Twitter

The `app-social/twitter` opens up a Twitter popup window.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-twitter.hbs'}}
		{{#app-social/twitter url="https://abcum.com" text="Abcum Website" via="abcum" hashtags="software"}}
			Share on Twitter
		{{/app-social/twitter}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-twitter.hbs'}}
{{/docs-demo}}

## Whatsapp

The `app-social/whatsapp` shares a message on WhatsApp if it is installed.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-social-whatsapp.hbs'}}
		{{#app-social/whatsapp url="https://abcum.com" text="Abcum Website"}}
			Share on Whatsapp
		{{/app-social/whatsapp}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-social-whatsapp.hbs'}}
{{/docs-demo}}

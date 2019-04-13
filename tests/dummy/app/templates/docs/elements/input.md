# Input

The `app-input` components can be used for creating input boxes and text areas.

## Area

The `app-input/area` component augments the Ember `textarea` element and enables autosizing, and line limits.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-area.hbs'}}
		{{app-input/area rows=5 limit=10 auto=true}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-area.hbs'}}
{{/docs-demo}}

## Color

The `app-input/color` component enables specifying a colour.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-color.hbs'}}
		{{app-input/color value="#00bfff"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-color.hbs'}}
{{/docs-demo}}

## Date

The `app-input/date` component enables specifying a date.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-date.hbs'}}
		{{app-input/date min="2017-01-01" max="2025-01-01"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-date.hbs'}}
{{/docs-demo}}

## Email

The `app-input/email` component creates a text field specifically for emails.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-email.hbs'}}
		{{app-input/email}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-email.hbs'}}
{{/docs-demo}}

## Month

The `app-input/month` component enables specifying a month.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-month.hbs'}}
		{{app-input/month min="2017-01" max="2025-01"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-month.hbs'}}
{{/docs-demo}}

## Number

The `app-input/number` component enables specifying a number.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-number.hbs'}}
		{{app-input/number min=0 max=100 step=5}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-number.hbs'}}
{{/docs-demo}}

## Password

The `app-input/password` component enables specifying passwords.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-password.hbs'}}
		{{app-input/password}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-password.hbs'}}
{{/docs-demo}}

## Star

The `app-input/stars` component enables creating a star rating selector.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-stars.hbs'}}
		{{app-input/stars value=4 min=1 max=10 color="#00bfff"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-stars.hbs'}}
{{/docs-demo}}

## Tel

The `app-input/tel` component creates a text field specifically for phone numbers.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-tel.hbs'}}
		{{app-input/tel}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-tel.hbs'}}
{{/docs-demo}}

## Text

The `app-input/text` component is a normal text input element.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-text.hbs'}}
		{{app-input/text}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-text.hbs'}}
{{/docs-demo}}

## Time

The `app-input/time` component enables specifying a time.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-time.hbs'}}
		{{app-input/time}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-time.hbs'}}
{{/docs-demo}}

## Url

The `app-input/url` component creates a text field specifically for urls.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-url.hbs'}}
		{{app-input/url}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-url.hbs'}}
{{/docs-demo}}

## Week

The `app-input/week` component enables specifying a week.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-input-week.hbs'}}
		{{app-input/week min="2017-W01" max="2025-W01"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-input-week.hbs'}}
{{/docs-demo}}

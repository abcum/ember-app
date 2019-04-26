# Format helpers

The format helpers enable easy formatting of different units.

## bytes

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-bytes.hbs'}}
		{{bytes 134186}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-bytes.hbs'}}
{{/docs-demo}}

## convert

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-convert.hbs'}}
		{{convert 1 from="GBP" to="EUR"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-convert.hbs'}}
{{/docs-demo}}

## countize

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-countize.hbs'}}
		From {{countize 1 "person" "people"}} to {{countize 3 "person" "people"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-countize.hbs'}}
{{/docs-demo}}

## country

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-country.hbs'}}
		{{country "GBR"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-country.hbs'}}
{{/docs-demo}}

## currency

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-currency.hbs'}}
		{{currency "GBP"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-currency.hbs'}}
{{/docs-demo}}

## duration

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-duration.hbs'}}
		{{duration 1283719281}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-duration.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-duration-exact.hbs'}}
		{{duration 1283719281 exact=true}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-duration-exact.hbs'}}
{{/docs-demo}}

## json

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-json.hbs'}}
		{{json (hash name="Sarah" title="CEO")}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-json.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-json-spaces.hbs'}}
		{{json (hash name="Sarah" title="CEO") spaces=2}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-json-spaces.hbs'}}
{{/docs-demo}}

## linkify

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-linkify.hbs'}}
		{{linkify "Click https://abcum.com"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-linkify.hbs'}}
{{/docs-demo}}

## markdown

> This requires the {{#link-to "docs.config"}}`marked`{{/link-to}} plugin to be enabled.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-markdown.hbs'}}
		{{markdown text}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-markdown.hbs'}}
	{{demo.snippet 'docs-demo-helpers-format-markdown.js'}}
{{/docs-demo}}

## md5  

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-md5.hbs'}}
		{{md5 "info@abcum.com"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-md5.hbs'}}
{{/docs-demo}}

## money

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-money.hbs'}}
		{{money 10000 currency="GBP"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-money.hbs'}}
{{/docs-demo}}

## number

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-number.hbs'}}
		{{number 134153 minimumFractionDigits=2}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-number.hbs'}}
{{/docs-demo}}

## percent

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-percent.hbs'}}
		{{percent 0.3 minimumFractionDigits=2}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-percent.hbs'}}
{{/docs-demo}}

## plaintext

> This requires the {{#link-to "docs.config"}}`marked`{{/link-to}} plugin to be enabled.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-plaintext.hbs'}}
		{{plaintext text}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-plaintext.hbs'}}
	{{demo.snippet 'docs-demo-helpers-format-plaintext.js'}}
{{/docs-demo}}

## regexp

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-regexp.hbs'}}
		{{regexp "[a-zA-Z]*" "ig"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-regexp.hbs'}}
{{/docs-demo}}

## uuid

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-format-uuid.hbs'}}
		{{uuid}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-format-uuid.hbs'}}
{{/docs-demo}}


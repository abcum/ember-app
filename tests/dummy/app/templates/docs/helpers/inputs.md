# Input helpers

The input helpers enable complex regular expressions for easy input box validity checking.

## pattern-alphanum

Allows `a-zA-Z0-9-+` values

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-alphanum.hbs'}}
		{{input pattern=(pattern-alphanum)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-alphanum.hbs'}}
{{/docs-demo}}

## pattern-country

Allows `ISO 3166` country codes

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-country.hbs'}}
		{{input pattern=(pattern-country)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-country.hbs'}}
{{/docs-demo}}

## pattern-currency

Allows `ISO 4217` currency codes

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-currency.hbs'}}
		{{input pattern=(pattern-currency)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-currency.hbs'}}
{{/docs-demo}}

## pattern-decimal

Allows positive or negative decimals

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-decimal.hbs'}}
		{{input pattern=(pattern-decimal)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-decimal.hbs'}}
{{/docs-demo}}

## pattern-email

Allows email addresses

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-email.hbs'}}
		{{input pattern=(pattern-email)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-email.hbs'}}
{{/docs-demo}}

## pattern-facebook

Allows facebook usernames

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-facebook.hbs'}}
		{{input pattern=(pattern-facebook)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-facebook.hbs'}}
{{/docs-demo}}

## pattern-integer

Allows positive or negative integers

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-integer.hbs'}}
		{{input pattern=(pattern-integer)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-integer.hbs'}}
{{/docs-demo}}

## pattern-letters

Allows only letter characters

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-letters.hbs'}}
		{{input pattern=(pattern-letters)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-letters.hbs'}}
{{/docs-demo}}

## pattern-numbers

Allows only numeric values

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-numbers.hbs'}}
		{{input pattern=(pattern-numbers)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-numbers.hbs'}}
{{/docs-demo}}

## pattern-phone

Allows phone numbers

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-phone.hbs'}}
		{{input pattern=(pattern-phone)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-phone.hbs'}}
{{/docs-demo}}

## pattern-twitter

Allows twitter handles

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-twitter.hbs'}}
		{{input pattern=(pattern-twitter)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-twitter.hbs'}}
{{/docs-demo}}

## pattern-url

Allows urls

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-inputs-pattern-url.hbs'}}
		{{input pattern=(pattern-url)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-inputs-pattern-url.hbs'}}
{{/docs-demo}}


# Time helpers

The time helpers enable easy formatting of dates and times.

## moment

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment.hbs'}}
		{{moment (now)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment.hbs'}}
{{/docs-demo}}

## moment-add

See [Moment.js add](https://momentjs.com/docs/#/manipulating/add/) for more information.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-add.hbs'}}
		{{moment-add (now) 2 "days"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-add.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-add-options.hbs'}}
		{{moment-add (now) options=(hash days=2 months=1)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-add-options.hbs'}}
{{/docs-demo}}

## moment-calendar

See [Moment.js calendar time](https://momentjs.com/docs/#/displaying/calendar-time/) for more information.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-calendar.hbs'}}
		{{moment-calendar (now)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-calendar.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-calendar-reference.hbs'}}
		{{moment-calendar (moment-add (now) 2 "days")}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-calendar-reference.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-calendar-format.hbs'}}
		{{moment-calendar (now) format=(hash sameDay="[Today]")}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-calendar-format.hbs'}}
{{/docs-demo}}

## moment-diff

See [Moment.js difference](https://momentjs.com/docs/#/displaying/difference/) for more information.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-diff.hbs'}}
		{{moment-diff (now) "2016-06-21"}} milliseconds
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-diff.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-diff-precision.hbs'}}
		{{moment-diff (now) "2016-06-21" precision="years"}} years
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-diff-precision.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-diff-fraction.hbs'}}
		{{moment-diff (now) "2016-06-21" precision="years" fraction=true}} years
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-diff-fraction.hbs'}}
{{/docs-demo}}

## moment-format

See [Moment.js format](https://momentjs.com/docs/#/displaying/format/) for more information.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-format.hbs'}}
		{{moment-format (now)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-format.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-format-simple.hbs'}}
		{{moment-format (now) "ddd, hA"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-format-simple.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-format-complex.hbs'}}
		{{moment-format (now) "dddd, MMMM Do YYYY, h:mm:ss a"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-format-complex.hbs'}}
{{/docs-demo}}

## moment-relative

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-relative.hbs'}}
		{{moment-relative (now)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-relative.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-relative-reference.hbs'}}
		{{moment-relative "2016-06-21" (now)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-relative-reference.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-relative-suffix.hbs'}}
		{{moment-relative "2016-06-21" (now) ignoreSuffix=true}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-relative-suffix.hbs'}}
{{/docs-demo}}

## moment-sub

See [Moment.js subtract](https://momentjs.com/docs/#/manipulating/subtract/) for more information.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-sub.hbs'}}
		{{moment-sub (now) 2 "days"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-sub.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-moment-sub-options.hbs'}}
		{{moment-sub (now) options=(hash days=2 months=1)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-moment-sub-options.hbs'}}
{{/docs-demo}}

## now

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-now.hbs'}}
		{{now}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-now.hbs'}}
{{/docs-demo}}

## utc

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-utc.hbs'}}
		{{utc}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-utc.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-time-utc-now.hbs'}}
		{{utc (now)}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-time-utc-now.hbs'}}
{{/docs-demo}}

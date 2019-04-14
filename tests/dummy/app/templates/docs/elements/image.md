# Image

The `app-image` component can be used to add lqip (low quality image placeholder) images.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-image-1.hbs'}}
		{{app-image
			width="686"
			height="483"
			lqip=(root-url "/img/small/1.jpg")
			src=(root-url "/img/large/1.jpg")
		}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-image-1.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-image-2.hbs'}}
		{{app-image
			width="686"
			height="483"
			lqip=(root-url "/img/small/2.jpg")
			src=(root-url "/img/large/2.jpg")
		}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-image-2.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-image-3.hbs'}}
		{{app-image
			width="686"
			height="483"
			lqip=(root-url "/img/small/3.jpg")
			src=(root-url "/img/large/3.jpg")
		}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-image-3.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-image-4.hbs'}}
		{{app-image
			width="686"
			height="483"
			lqip=(root-url "/img/small/4.jpg")
			src=(root-url "/img/large/4.jpg")
		}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-image-4.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-image-5.hbs'}}
		{{app-image
			width="686"
			height="483"
			lqip=(root-url "/img/small/5.jpg")
			src=(root-url "/img/large/5.jpg")
		}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-image-5.hbs'}}
{{/docs-demo}}

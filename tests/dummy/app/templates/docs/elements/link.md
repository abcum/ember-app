# Link

The `app-link` component enables adding links for opening external pages, or downloading files. It works seamlessly in both the browser, and in an Electron application, meaning that only one type of link would need to be created regardless of which environment the application is being used.

## Basic link

To open a link in another tab (in the browser), or in a new browser window (in Electron), then simply add an `app-link` element with the `url` attribute of the file or page to open.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-link.hbs'}}
		{{#app-link url="/logo.png"}}
			<img src="/logo.png" />
		{{/app-link}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-link.hbs'}}
{{/docs-demo}}

## Download link

To download a file (in the browser), or directly inside the application (in Electron), then simply add an `app-link` element with the `url` attribute of the file or page to download, and specify the `download` attribute. For the browser the filename will be changed to the value of the download attribute when it is downloaded.

> If downloading a file which is not on the same origin, the download attribute will not work when being used in a web browser. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes) for further information.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-link-download.hbs'}}
		{{#app-link url="/logo.png" download="abcum"}}
			<img src="/logo.png" />
		{{/app-link}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-link-download.hbs'}}
{{/docs-demo}}

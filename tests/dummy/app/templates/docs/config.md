# Config

## Default configuration

If no configuration is defined in the `config/environment.js` file, then the default configuration will be used. This configuration will disable all versioning and update checks, will remove any service workers, and will minify the final build html file contents. In addition, no plugins will be bundled with the application, which will disable some functionality.

<details>
	<summary>config/environment.js</summary>
	{{docs-snippet name='docs-demo-config-default.js'}}
</details>

## Example configuration

This example configuration below demonstrates setting different features of the `ember-app` addon. This configuration enables progressive web app functionality by enabling service worker caching, versioning, and update checking, and enables metrics collection using Google Analytics. In addition, several plugins are bundled with the application, enabling extra functionality.

<details>
	<summary>config/environment.js</summary>
	{{docs-snippet name='docs-demo-config-example.js'}}
</details>

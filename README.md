# ember-app

An addon which makes building complex applications using Ember.js easier.

[![](https://img.shields.io/circleci/project/github/abcum/ember-app.svg?style=flat-square)](https://circleci.com/gh/abcum/ember-app)
[![](https://img.shields.io/npm/v/@abcum/ember-app.svg?style=flat-square)](https://www.npmjs.com/package/@abcum/ember-app)
[![](https://img.shields.io/badge/ember-2.18+-orange.svg?style=flat-square)](https://github.com/abcum/ember-app)
[![](https://david-dm.org/abcum/ember-app/status.svg?style=flat-square)](https://david-dm.org/abcum/ember-app)
[![](https://david-dm.org/abcum/ember-app/dev-status.svg?style=flat-square)](https://david-dm.org/abcum/ember-app?type=dev)
[![](https://img.shields.io/badge/license-MIT-00bfff.svg?style=flat-square)](https://github.com/abcum/ember-app)

#### Features

The `ember-app` addon adds a multitute of functionality to an Ember.js app:

- ##### Advanced styling and SCSS mixins
	A variety of scss mixins enable easy styling of advanced user interfaces.

- ##### Application versioning
	Use automatic application versioning functionality to detect when there is an update to your single-page Ember.js application. This functionality is available using either an automatically generated [version file](https://abcum.github.io/ember-app/docs/services/version), or using a [service worker](https://abcum.github.io/ember-app/docs/services/worker).

- ##### Service worker configuration
	Easily cache assets using a service worker, and enable offline usage of your Ember.js application. The service worker is configured automatically, enabling automatic service worker installation, update detection, and cache activation.

- ##### Progressive Web App customisation
	Automatically enable progressive web app features in your Ember.js application, including theme specifications, icons, startup images, and web-app manifest creation.

- ##### 3rd party metrics services integration
	Automatic integration with Google Analytics, Facebook Pixel, Heap Analytics, Mixpanel, and Intercom, enable advanced 3rd party integration for usage detection in your Ember.js application.

- ##### Custom Moment.js library integration
	Make use of custom Moment.js library integration using [ES6 module imports](https://abcum.github.io/ember-app/docs/modules). Extended functionality allows for detecting weekdays and weekends, workdays, and holidays.

- ##### Advanced user-interface elements
	Use a variety of advanced elements to get the most our of your Ember.js application. Elements include [charts](https://abcum.github.io/ember-app/docs/elements/chart), [code editors](https://abcum.github.io/ember-app/docs/elements/codemirror), [right-click menus](https://abcum.github.io/ember-app/docs/elements/contextmenu), [dropdown menus](https://abcum.github.io/ember-app/docs/elements/dropdown), [droppable areas](https://abcum.github.io/ember-app/docs/elements/droppable), [scalable iframes](https://abcum.github.io/ember-app/docs/elements/frame), [gravatars](https://abcum.github.io/ember-app/docs/elements/gravatar) and [initials](https://abcum.github.io/ember-app/docs/elements/initials), [LQIP viewport-detecting images](https://abcum.github.io/ember-app/docs/elements/image), [modal windows](https://abcum.github.io/ember-app/docs/elements/modal), [element popups](https://abcum.github.io/ember-app/docs/elements/popup), and [tags](https://abcum.github.io/ember-app/docs/elements/tag).

- ##### Advanced handlebars helpers
	A variety of handlebars helpers enable advanced functionality directly inside the templating language. Helpers include [action helpers](https://abcum.github.io/ember-app/docs/helpers/actions), [array helpers](https://abcum.github.io/ember-app/docs/helpers/arrays), [dom helpers](https://abcum.github.io/ember-app/docs/helpers/dom), [event helpers](https://abcum.github.io/ember-app/docs/helpers/events), [format helpers](https://abcum.github.io/ember-app/docs/helpers/format), [keyboard helpers](https://abcum.github.io/ember-app/docs/helpers/keyboard), [logic helpers](https://abcum.github.io/ember-app/docs/helpers/logic), [maths helpers](https://abcum.github.io/ember-app/docs/helpers/maths), [object helpers](https://abcum.github.io/ember-app/docs/helpers/objects), [promise helpers](https://abcum.github.io/ember-app/docs/helpers/promises), [routing helpers](https://abcum.github.io/ember-app/docs/helpers/routing), [scrolling helpers](https://abcum.github.io/ember-app/docs/helpers/scrolling), [sorting helpers](https://abcum.github.io/ember-app/docs/helpers/sorting), [string helpers](https://abcum.github.io/ember-app/docs/helpers/strings), and [time helpers](https://abcum.github.io/ember-app/docs/helpers/time).

- ##### Built-in Electron integration
	Easily serve, build and deploy an Electron application using built-in Ember CLI commands. The addon automatically detects when running in Electron, enabling [automatic update detection, installation, and restarting](https://abcum.github.io/ember-app/docs/services/electron), and ES6 [Electron module](https://abcum.github.io/ember-app/docs/electron) integration.

#### Installation

`ember install ember-app`

#### Usage

Visit the [documentation](https://abcum.github.io/ember-app/) site for more information on how to use the addon when developing an Ember.js app.

#### Contributing

See the [contributing](CONTRIBUTING.md) guide for details on how to develop and contribute changes to `ember-app`.

#### License

This project is licensed under the [MIT License](LICENSE.md).

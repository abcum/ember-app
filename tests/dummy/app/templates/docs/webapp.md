# Webapp

Progressive Web Application support is provided automatically when building your application using the ember-app addon. Both a `webmanifest` file, and a `browserconfig` file are generated, along with icons, tiles, and launch images for all different browsers, devices, and platforms.

Progressive Web Application settings are configured using the {{#link-to "docs.config"}}`webapp`{{/link-to}} configuration options.

## Icons and Images

All icons and images for the different browsers and devices are generated automatically from a few base images.

To build and deploy the necessary progressive web application icons and launch images, you must ensure that you have created the necessary image files and placed them in the correct folder within your application.

To help generate the necessary icons you can use [this Sketch file](/webapp.sketch).

### Icon images

- `public / static / webapp / icon.png` (Used for generating app icons)
- `public / static / webapp / icon.svg` (Used for Safari pinned tab icons)
- `public / static / webapp / tile.png` (Used for Windows pinned app tiles)

### Launch images

- `public / static / webapp / launch-640x1136.png`
- `public / static / webapp / launch-750x1294.png`
- `public / static / webapp / launch-1125x2436.png`
- `public / static / webapp / launch-1242x2148.png`
- `public / static / webapp / launch-1536x2048.png`
- `public / static / webapp / launch-1668x2224.png`
- `public / static / webapp / launch-2048x2732.png`

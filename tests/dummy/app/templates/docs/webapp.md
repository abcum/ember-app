# Webapp

Progressive Web Application support is provided automatically when building your application using the ember-app addon. Both a `webmanifest` file, and a `browserconfig` file are generated, along with icons, tiles, and launch images for all different browsers, devices, and platforms.

Progressive Web Application settings are configured using the {{#link-to "docs.config"}}`webapp`{{/link-to}} configuration options.

## Icons and Images

All icons and images for the different browsers and devices are generated automatically from a few base images.

To build and deploy the necessary progressive web application icons and launch images, you must ensure that you have created the necessary image files and placed them in the correct folder within your application.

To help generate the necessary icons you can use [this Sketch file](/webapp.sketch).

### Icon images

- public&#47;static&#47;webapp&#47;icon.png (Used for generating app icons)
- public&#47;static&#47;webapp&#47;icon.svg (Used for Safari pinned tab icons)
- public&#47;static&#47;webapp&#47;tile.png (Used for Windows pinned app tiles)

### Launch images

- public&#47;static&#47;webapp&#47;launch-640x1136.png
- public&#47;static&#47;webapp&#47;launch-750x1294.png
- public&#47;static&#47;webapp&#47;launch-1125x2436.png
- public&#47;static&#47;webapp&#47;launch-1242x2148.png
- public&#47;static&#47;webapp&#47;launch-1536x2048.png
- public&#47;static&#47;webapp&#47;launch-1668x2224.png
- public&#47;static&#47;webapp&#47;launch-2048x2732.png

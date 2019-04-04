'use strict';

const Filter = require('broccoli-filter');
const minify = require('html-minifier').minify;

module.exports = class Minify extends Filter {

	constructor(inputNode, options) {

		super(inputNode, {
			extensions: ['html'],
			targetExtension: 'html',
		});

		this.opts = options;

	}

	processString(string, path) {

		return minify(string, this.opts);

	}

};

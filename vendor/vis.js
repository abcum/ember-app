(function() {

	/* globals define, vis */

	function generateModule(name, values) {
		define(name, [], function() {
			'use strict';
			return values;
		});
	}

	generateModule('vis.js', {
		'default': typeof vis === 'undefined' ? null : vis
	});

})();

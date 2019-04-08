(function() {

	/* globals define, marked */

	function generateModule(name, values) {
		define(name, [], function() {
			'use strict';
			return values;
		});
	}

	generateModule('marked', {
		'default': typeof marked === 'undefined' ? null : marked
	});

})();

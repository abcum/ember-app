import Helper from '@ember/component/helper';

export default Helper.extend({

	compute([id]) {
		return function() {
			document.getElementById(id).focus();
			return false;
		};
	}

});

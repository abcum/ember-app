import Service from '@ember/service';

export default Service.extend({

	build(path) {
		return `${this.env.rootURL}/${path}`.replace(/\/\/+/g, '/');
	},

});

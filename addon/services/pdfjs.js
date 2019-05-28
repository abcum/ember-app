/* globals pdfjsLib */
import Service from '@ember/service';
import { inject } from '@ember/service';
import { Promise, resolve } from 'rsvp';

export default Service.extend({

	rooturl: inject(),

	loaded: false,

	load() {

		if (this.loaded) return resolve();

		return new Promise( (resolve, reject) => {
			let script = document.createElement("script");
			script.onload = resolve;
			script.onerror = reject;
			script.src = this.rooturl.build('/assets/pdf.js');
			document.head.appendChild(script);
			this.loaded = true;
		});

	},

	open(url) {

		return this.load().then( () => {
			pdfjsLib.GlobalWorkerOptions.workerSrc = this.rooturl.build('/assets/pdf-worker.js');
			return pdfjsLib.getDocument(url);
		});

	},

});

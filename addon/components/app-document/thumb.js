import Component from '@ember/component';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import layout from '../../templates/components/app-document/thumb';

export default Component.extend({

	tagName: 'app-document-thumb',

	layout,

	pdfjs: inject(),

	didReceiveAttrs() {

		this._super(...arguments);

		this.get('process').perform(this.doc, this.step);

	},

	click() {
		if (this.select) {
			this.select(this.step);
		}
	},

	process: task(function * (doc, num) {

		if (this.doc === undefined) return;

		yield timeout(100);

		let page, ren;

		try {

			page = yield doc.getPage(num);

			let viewport = page.getViewport({ scale: 1 });
			let canvas = this.element.querySelectorAll('canvas')[0];
			let context = canvas.getContext('2d');

			canvas.width = viewport.width;
			canvas.height = viewport.height;

			ren = yield page.render({
				canvasContext: context,
				viewport: viewport,
			});

			let img = this.element.querySelectorAll('img')[0];
			img.src = canvas.toDataURL('image/jpeg');

		} finally {

			if (page && page.cleanup) page.cleanup();
			if (ren && ren.cancel) ren.cancel();

		}

	}).restartable(),

});

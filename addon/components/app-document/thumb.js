import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../../templates/components/app-document/thumb';

function timeout(ms) {
	return new Promise( func => setTimeout(func, ms) );
}

export default Component.extend({

	tagName: 'app-document-thumb',

	layout,

	pdfjs: inject(),

	didReceiveAttrs() {

		this._super(...arguments);

		this.process(this.doc, this.step);

	},

	click() {
		if (this.select) {
			this.select(this.step);
		}
	},

	async process(doc, num) {

		if (this.doc === undefined) return;

		await timeout(100);

		let page, ren;

		try {

			page = await doc.getPage(num);

			let viewport = page.getViewport({ scale: 1 });
			let canvas = this.element.querySelectorAll('canvas')[0];
			let context = canvas.getContext('2d');

			canvas.width = viewport.width;
			canvas.height = viewport.height;

			ren = await page.render({
				canvasContext: context,
				viewport: viewport,
			});

			let img = this.element.querySelectorAll('img')[0];
			img.src = canvas.toDataURL('image/jpeg');

		} finally {

			if (page && page.cleanup) page.cleanup();
			if (ren && ren.cancel) ren.cancel();

		}

	},

});

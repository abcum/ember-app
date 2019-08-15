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

		if (doc === undefined) return;

		await timeout(100);

		try {

			if (this.ren) this.ren.cancel();

			this.pge = await doc.getPage(num);

			let viewport = this.pge.getViewport({ scale: 1 });
			let canvas = this.element.querySelectorAll('canvas')[0];
			let context = canvas.getContext('2d');

			canvas.width = viewport.width;
			canvas.height = viewport.height;

			this.ren = await this.pge.render({
				canvasContext: context,
				viewport: viewport,
			});

			let img = this.element.querySelectorAll('img')[0];
			img.src = canvas.toDataURL('image/jpeg');

		} finally {

			if (this.pge && this.pge.cleanup) this.pge.cleanup();
			if (this.ren && this.ren.cancel) this.ren.cancel();

		}

	},

});

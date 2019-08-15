import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../../templates/components/app-document/viewer';

function timeout(ms) {
	return new Promise( func => setTimeout(func, ms) );
}

export default Component.extend({

	tagName: 'app-document-viewer',

	layout,

	pdfjs: inject(),

	didReceiveAttrs() {

		this._super(...arguments);

		this.process(this.doc, this.page);

	},

	async process(doc, num) {

		if (doc === undefined) return;

		await timeout(100);

		try {

			if (this.ren) this.ren.cancel();

			this.pge = await doc.getPage(num);

			let vp = this.pge.getViewport({ scale: 1 });
			let ww = this.element.offsetWidth - this.spacing;
			let wh = this.element.offsetHeight - this.spacing;
			let scale = Math.min(ww/vp.width, wh/vp.height);

			let viewport = this.pge.getViewport({ scale });
			let canvas = this.element.querySelectorAll('canvas')[0];
			let context = canvas.getContext('2d');

			canvas.width = viewport.width;
			canvas.height = viewport.height;

			this.ren = await this.pge.render({
				canvasContext: context,
				viewport: viewport,
			});

		} finally {

			if (this.pge && this.pge.cleanup) this.pge.cleanup();
			if (this.ren && this.ren.cancel) this.ren.cancel();

		}

	},

});

import Component from '@ember/component';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import layout from '../../templates/components/app-document/viewer';

export default Component.extend({

	tagName: 'app-document-viewer',

	layout,

	pdfjs: inject(),

	didReceiveAttrs() {

		this._super(...arguments);

		this.get('process').perform(this.doc, this.page);

	},

	process: task(function * (doc, num) {

		if (this.doc === undefined) return;

		yield timeout(100);

		let page, ren;

		try {

			page = yield doc.getPage(num);

			let vp = page.getViewport(1);
			let ww = this.element.offsetWidth - this.spacing;
			let wh = this.element.offsetHeight - this.spacing;
			let scale = Math.min(ww/vp.width, wh/vp.height);

			let viewport = page.getViewport(scale);
			let canvas = this.element.querySelectorAll('canvas')[0];
			let context = canvas.getContext('2d');

			canvas.width = viewport.width;
			canvas.height = viewport.height;

			ren = yield page.render({
				canvasContext: context,
				viewport: viewport,
			});

		} finally {

			if (page && page.cleanup) page.cleanup();
			if (ren && ren.cancel) ren.cancel();

		}

	}).restartable(),

});

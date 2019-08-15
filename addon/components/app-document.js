import Component from '@ember/component';
import ResizeMixin from "../mixins/resize";
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import layout from '../templates/components/app-document';

function timeout(ms) {
	return new Promise( func => setTimeout(func, ms) );
}

export default Component.extend(ResizeMixin, {

	tagName: 'app-document',

	layout,

	spacing: 75,

	pdfjs: inject(),

	didInsertElement() {

		this._super(...arguments);

		this.set('width', this.element.offsetWidth);
		this.set('height', this.element.offsetHeight);

	},

	didResizeElement() {

		this._super(...arguments);

		this.set('width', this.element.offsetWidth);
		this.set('height', this.element.offsetHeight);

	},

	didReceiveAttrs() {

		this._super(...arguments);

		this.process(this.url);

	},

	willDestroyElement() {

		this.cleanup();

		this._super(...arguments);

	},

	cleanup() {

		if (this.xhr && this.xhr.destroy) {
			this.xhr.destroy();
		}

		if (this.doc && this.doc.cleanup) {
			this.doc.cleanup();
		}

		if (this.doc && this.doc.destroy) {
			this.doc.destroy();
		}

	},

	pages: computed('doc.numPages', function() {

		let n = this.doc ? this.doc.numPages : 0;

		return new Array(n).fill().map( (v, k) => k+1);

	}),

	async process(url) {

		try {

			this.cleanup();

			await timeout(100);

			this.xhr = this.get('pdfjs').open(url);

			this.doc = await this.xhr;

			this.notifyPropertyChange('doc');

		} finally {

			if (this.xhr && this.xhr.destroy) {
				this.xhr.destroy();
			}

		}

	},

	actions: {

		select(page) {

			if (this.onSelectPage) {
				this.onSelectPage(page);
			}

		},

	},

});

import Component from '@ember/component';
import ResizeMixin from "../mixins/resize";
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import layout from '../templates/components/app-document';

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

		this.get('renderDoc').perform(this.url);

	},

	willDestroyElement() {

		this.cleanup();

		this._super(...arguments);

	},

	cleanup() {

		if (this.xhr && this.xhr.destroy) {
			this.xhr.destroy();
		}

		if (this.doc && this.doc.destroy) {
			this.doc.cleanup();
			this.doc.destroy();
		}

	},

	renderDoc: task(function * (url) {

		try {

			this.cleanup();

			yield timeout(100);

			this.xhr = this.get('pdfjs').open(url);

			this.doc = yield this.xhr;

			this.notifyPropertyChange('doc');

		} finally {

			if (this.xhr && this.xhr.destroy) {
				this.xhr.destroy();
			}

		}

	}).restartable(),

	actions: {

		select(page) {

			if (this.onSelectPage) {
				this.onSelectPage(page);
			}

		},

	},

});

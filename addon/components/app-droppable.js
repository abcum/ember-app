import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import { debounce } from '@ember/runloop';
import layout from "../templates/components/app-droppable";

export default Component.extend(StylesMixin, {

	layout,

	tagName: 'app-droppable',

	width: null,

	height: null,

	waiting: true,

	loading: false,

	dropping: false,

	mimetypes: null,

	extensions: null,

	onOpen() {},

	onLoad() {},

	onError() {},

	onProgress() {},

	attributeBindings: [
		'dropping',
		'loading',
		'waiting'
	],

	styleBindings: Object.freeze([
		'width',
		'height',
	]),

	click() {
		this.element.querySelectorAll('input')[0].click();
	},

	dragAway() {
		this.set('dropping', false);
	},

	dragOver(e) {
		e.preventDefault();
		e.stopPropagation();
		this.set('dropping', true);
		debounce(this, this.dragAway, 100);
	},

	drop(e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer) {
			if (e.dataTransfer.files.length > 0) {
				return this.into(e.dataTransfer.files);
			}
		}
	},

	into(files) {

		let ms = [].concat(this.mimetypes).filter(Boolean);
		let es = [].concat(this.extensions).filter(Boolean);

		for (let i=0; i<files.length; i++) {

			let f = files[i];

			if (es.length && es.includes(f.ext) === false) {
				return;
			}

			if (ms.length && ms.includes(f.type) === false) {
				return;
			}

			let r = new FileReader();

			this.onOpen(f);

			r.onload = e => {
				this.set('waiting', true);
				this.set('loading', false);
				this.onLoad(e, f);
			}

			r.onerror = e => {
				this.set('waiting', true);
				this.set('loading', false);
				this.onError(e, f);
			}

			r.onprogress = e => {
				this.set('waiting', false);
				this.set('loading', true);
				this.onProgress(e, f);
			}

			r.readAsBinaryString(f);

		}

	},

	actions: {
		change(e) {
			this.into(e.target.files);
		}
	},

});

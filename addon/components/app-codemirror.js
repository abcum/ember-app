import Component from '@ember/component';
import CodeMirror from "codemirror";

const properties = [
	'autoCloseBrackets',
	'autofocus',
	'commentBlankLines',
	'cursorBlinkRate',
	'electricChars',
	'extraKeys',
	'firstLineNumber',
	'historyEventDelay',
	'indentUnit',
	'indentWithTabs',
	'lineNumbers',
	'lineWrapping',
	'matchBrackets',
	'mode',
	'readOnly',
	'smartIndent',
	'tabSize',
	'theme',
	'undoDepth',
	'viewportMargin',
];

export default Component.extend({

	tagName: 'app-codemirror',

	onChange() {},

	classNames: ['editable-code'],

	// ------------------------------
	// Set codemirror options
	// ------------------------------

	autoCloseBrackets: true,
	autofocus: false,
	commentBlankLines: false,
	cursorBlinkRate: 530,
	electricChars: true,
	extraKeys: null,
	firstLineNumber: 1,
	historyEventDelay: 1250,
	indentUnit: 4,
	indentWithTabs: false,
	lineNumbers: true,
	lineWrapping: false,
	matchBrackets: true,
	mode: 'javascript',
	readOnly: false,
	smartIndent: true,
	tabSize: 4,
	theme: 'abcum',
	undoDepth: 200,
	value: '',
	viewportMargin: 10,

	// ------------------------------
	// Set codemirror editor
	// ------------------------------

	init() {

		this._super(...arguments);

		this.extraKeys = {
			'Cmd-/': 'toggleComment',
			'Cmd-Alt-/': 'blockComment',
		};

	},

	didReceiveAttrs() {

		this._super(...arguments);

		if (this.editor) {

			let value = this.get('value');

			if (this.editor.getValue() !== value) {
				this.editor.setValue(value);
			}

			let options = this.getProperties(properties);

			Object.keys(options).forEach(key => {
				if (this.editor.getOption(key) != options[key]) {
					this.editor.setOption(key, options[key]);
				}
			});

		}

	},

	didInsertElement() {

		this._super(...arguments);

		let value = this.get('value');

		let options = this.getProperties(properties);

		this.editor = new CodeMirror(this.element, options);

		this.editor.setValue(value);

		this.editor.on('change', (instance) => {
			this.get('onChange')(instance.getValue());
		});

	},

});

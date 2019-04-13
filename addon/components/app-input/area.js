import TextArea from '@ember/component/text-area';

export default TextArea.extend({

	didUpdate() {
		this._super(...arguments);
		if (!this.auto) return true;
		this.element.style.height = 'auto';
		this.element.style.overflow = 'hidden';
		this.element.style.height = this.element.scrollHeight + 'px';
	},

	keyPress(e) {
		this._super(...arguments);
		if (!this.limit) return true;
		let value = this.element.value;
		let limit = parseInt(this.limit);
		let lines = (value.match(/\n/g) || []).length + 1;
		return (e.which === 13 && lines === limit) ? false : true;
	},

});

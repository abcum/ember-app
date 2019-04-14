import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | nl2br', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `nl2br` format', async function(assert) {
		assert.expect(7);
		this.set('input', 'This is some text');
		await render(hbs`{{nl2br input}}`);
		assert.equal(this.element.innerHTML, 'This is some text');
		this.set('input', 'This is some text\rwith a line break');
		assert.equal(this.element.innerHTML, 'This is some text<br>with a line break');
		this.set('input', 'This is some text\nwith a line break');
		assert.equal(this.element.innerHTML, 'This is some text<br>with a line break');
		this.set('input', 'This is some text\r\nwith a line break');
		assert.equal(this.element.innerHTML, 'This is some text<br>with a line break');
		this.set('input', 'This is some text\r\r\rwith many line breaks');
		assert.equal(this.element.innerHTML, 'This is some text<br><br><br>with a line break');
		this.set('input', 'This is some text\n\n\nwith many line breaks');
		assert.equal(this.element.innerHTML, 'This is some text<br><br><br>with a line break');
		this.set('input', 'This is some text\r\n\r\n\r\nwith many line breaks');
		assert.equal(this.element.innerHTML, 'This is some text<br><br><br>with a line break');
	});
});

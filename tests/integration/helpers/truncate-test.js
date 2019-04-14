import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | truncate', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `truncate` format', async function(assert) {
		assert.expect(4);
		this.set('value', 4);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{truncate input value}}`);
		assert.equal(this.element.textContent.trim(), 'this...');
		this.set('value', 6);
		assert.equal(this.element.textContent.trim(), 'this I...');
		this.set('value', 17);
		assert.equal(this.element.textContent.trim(), 'this Is some TEXT');
		this.set('value', 44);
		assert.equal(this.element.textContent.trim(), 'this Is some TEXT');
	});
});

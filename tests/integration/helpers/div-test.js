import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | div', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns the dividing of the given values', async function(assert) {
		assert.expect(4);
		this.set('input', 2);
		await render(hbs`{{div 100 input}}`);
		assert.equal(this.element.textContent.trim(), '50');
		this.set('input', 3);
		assert.equal(this.element.textContent.trim(), '33.333333333333336');
		this.set('input', 4);
		assert.equal(this.element.textContent.trim(), '25');
		this.set('input', 5);
		assert.equal(this.element.textContent.trim(), '20');
	});
});

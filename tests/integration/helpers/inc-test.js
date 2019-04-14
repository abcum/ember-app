import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | inc', function(hooks) {

	setupRenderingTest(hooks);

	test('It increments a value by 1', async function(assert) {
		assert.expect(2);
		this.set('input', 10);
		await render(hbs`{{inc input}}`);
		assert.equal(this.element.textContent.trim(), '11');
		this.set('input', 50);
		assert.equal(this.element.textContent.trim(), '51');
	});

	test('It increments a value by an amount', async function(assert) {
		assert.expect(2);
		this.set('input', 10);
		await render(hbs`{{inc 10 input}}`);
		assert.equal(this.element.textContent.trim(), '20');
		this.set('input', 50);
		assert.equal(this.element.textContent.trim(), '60');
	});

});

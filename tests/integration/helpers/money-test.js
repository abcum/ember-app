import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | money', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the money correctly', async function(assert) {

		assert.expect(7);

		await render(hbs`{{money 33}}`);
		assert.equal(this.element.textContent.trim(), 'US$33.00');
		await render(hbs`{{money 33 currency='GBP'}}`);
		assert.equal(this.element.textContent.trim(), '£33.00');
		await render(hbs`{{money 33 minimumFractionDigits=0}}`);
		assert.equal(this.element.textContent.trim(), 'US$33');
		await render(hbs`{{money 33.01689 maximumFractionDigits=2}}`);
		assert.equal(this.element.textContent.trim(), 'US$33.02');

		await render(hbs`{{money 369000}}`);
		assert.equal(this.element.textContent.trim(), 'US$369,000.00');
		await render(hbs`{{money 369000 useGrouping=true}}`);
		assert.equal(this.element.textContent.trim(), 'US$369,000.00');
		await render(hbs`{{money 369000 useGrouping=false}}`);
		assert.equal(this.element.textContent.trim(), 'US$369000.00');

	});
});

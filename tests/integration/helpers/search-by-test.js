import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | search-by', function(hooks) {

	setupRenderingTest(hooks);

	test('It ensures search-by works correctly', async function(assert) {

		let testOne = [
			{ name: 'A', one: 'abc def', two: 'jhi jkl' },
			{ name: 'B', one: 'mno pqr', two: 'stu vwx' },
			{ name: 'C', one: 'abc def mno pqr', two: 'jhi jkl stu vwx' },
		];

		let testTwo = [
			{ name: 'A', one: ['abc', 'def'], two: ['jhi', 'jkl'] },
			{ name: 'B', one: ['mno', 'pqr'], two: ['stu', 'vwx'] },
			{ name: 'C', one: ['abc', 'def', 'mno', 'pqr'], two: ['jhi', 'jkl', 'stu', 'vwx'] },
		];

		assert.expect(16);

		this.set('input', undefined);
		await render(hbs`{{#each (search-by 'one' 'two' value input) as |v|}}{{v.name}} {{/each}}`);
		this.set('value', 'abc');
		assert.equal(this.element.textContent.trim(), '');
		this.set('value', 'mno');
		assert.equal(this.element.textContent.trim(), '');
		this.set('value', 'kl');
		assert.equal(this.element.textContent.trim(), '');
		this.set('value', 'jhi stu');
		assert.equal(this.element.textContent.trim(), '');

		this.set('input', testOne);
		await render(hbs`{{#each (search-by 'one' 'two' value input) as |v|}}{{v.name}} {{/each}}`);
		this.set('value', 'abc');
		assert.equal(this.element.textContent.trim(), 'A C');
		this.set('value', 'mno');
		assert.equal(this.element.textContent.trim(), 'B C');
		this.set('value', 'jkl');
		assert.equal(this.element.textContent.trim(), 'A C');
		this.set('value', 'kl');
		assert.equal(this.element.textContent.trim(), 'A C');
		this.set('value', 'jhi stu');
		assert.equal(this.element.textContent.trim(), 'C');
		this.set('value', 'abc mno jhi stu');
		assert.equal(this.element.textContent.trim(), 'C');

		this.set('input', testTwo);
		await render(hbs`{{#each (search-by 'one' 'two' value input) as |v|}}{{v.name}} {{/each}}`);
		this.set('value', 'abc');
		assert.equal(this.element.textContent.trim(), 'A C');
		this.set('value', 'mno');
		assert.equal(this.element.textContent.trim(), 'B C');
		this.set('value', 'jkl');
		assert.equal(this.element.textContent.trim(), 'A C');
		this.set('value', 'kl');
		assert.equal(this.element.textContent.trim(), 'A C');
		this.set('value', 'jhi stu');
		assert.equal(this.element.textContent.trim(), 'C');
		this.set('value', 'abc mno jhi stu');
		assert.equal(this.element.textContent.trim(), 'C');

	});

});

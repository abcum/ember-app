import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import marked from 'marked';

export function markdown([value='']) {
	return htmlSafe(
		marked( String(value) )
	);
}

export default helper(markdown);

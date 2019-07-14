import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import marked from 'marked';

export function markdown([value=''], { inline = false }) {

	return htmlSafe(
		inline ? marked.inlineLexer(String(value), []) : marked(String(value))
	);
}

export default helper(markdown);

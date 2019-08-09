import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import marked from 'marked';

const renderer = function() {
	const renderer = new marked.Renderer();
	renderer.paragraph = (text) => text + '<br><br>';
	return renderer;
};

export function markdown([value=''], { inline = false }) {

	switch (inline) {
	case true:
		return htmlSafe(marked(String(value), {
			renderer: renderer(), gfm: true, breaks: true,
		}));
	case false:
		return htmlSafe(marked(String(value), {
			gfm: true, breaks: true,
		}));
	}

}

export default helper(markdown);

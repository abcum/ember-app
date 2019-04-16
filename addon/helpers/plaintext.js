import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import marked from 'marked';

const renderer = function() {
	const renderer = new marked.Renderer();
	renderer.heading = (text) => text + '\n';
	renderer.image = () => '';
	renderer.link = (href, title, text) => text;
	renderer.paragraph = (text) => text + '\n';
	renderer.code = () => '';
	renderer.html = () => '';
	renderer.strong = (text) => text;
	renderer.em = (text) => text;
	renderer.codespan = (text) => text;
	renderer.br = () => '\n';
	return renderer;
};

export function plaintext([value='']) {
	return htmlSafe(
		marked(String(value), {
			renderer: renderer(),
		})
	);
}

export default helper(plaintext);

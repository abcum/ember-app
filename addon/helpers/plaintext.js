import { helper } from '@ember/component/helper';
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

	return marked(String(value), {
		renderer: renderer(),
	}).replace(/&#(\d+);/g, (match, dec) => {
		return String.fromCharCode(dec);
	});
}

export default helper(plaintext);

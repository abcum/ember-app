export default function intRange(b, e) {
	let min = Math.min(b, e);
	let max = Math.max(b, e);
	return Array(max-min+1).fill().map( (_, n) => min + n );
}

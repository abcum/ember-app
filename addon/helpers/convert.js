import { helper } from '@ember/component/helper';
import currency from '../utils/currency';

export function convert(params, hash) {

	let t = hash.to || 'USD';
	let f = hash.from || 'USD';
	let a = parseFloat(params[0]);

	if (f === window.fxbase || t === 'USD') {
		return a * currency(t);
	}

	if (t === window.fxbase || t === 'USD') {
		return a * ( 1 / currency(f) );
	}

	return a * ( currency(t) * ( 1 / currency(f) ) );

}

export default helper(convert);

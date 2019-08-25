export default function currency(code) {

	if (window.fxrates && window.fxrates[code]) {
		return window.fxrates[code];
	}

	return 1;

}

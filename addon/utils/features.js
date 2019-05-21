export default {
	fastboot,
	localStorage,
	createElement,
	serviceWorker,
	windowLocation,
	addEventListener,
	removeEventListener,
	intersectionObserver,
}

export function fastboot() {
	return typeof FastBoot !== 'undefined';
}

export function geolocation() {
	try {
		if (!window) throw "exception";
		if (!window.navigator) throw "exception";
		if (!window.navigator.geolocation) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

export function localStorage() {
	try {
		if (!window) throw "exception";
		if (!window.localStorage) throw "exception";
		window.localStorage.setItem('test', 'OK');
		window.localStorage.removeItem('test');
		return true;
	} catch (e) {
		return false;
	}
}

export function createElement() {
	try {
		if (!window) throw "exception";
		if (!document) throw "exception";
		if (!document.createElement) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

export function serviceWorker() {
	try {
		if (!window) throw "exception";
		if (!window.navigator) throw "exception";
		if (!window.navigator.serviceWorker) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

export function windowLocation() {
	try {
		if (!window) throw "exception";
		if (!window.location) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

export function addEventListener() {
	try {
		if (!window) throw "exception";
		if (!window.addEventListener) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

export function removeEventListener() {
	try {
		if (!window) throw "exception";
		if (!window.removeEventListener) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

export function intersectionObserver() {
	try {
		if (!window) throw "exception";
		if (!window.IntersectionObserver) throw "exception";
		if (!window.IntersectionObserverEntry) throw "exception";
		return true;
	} catch (e) {
		return false;
	}
}

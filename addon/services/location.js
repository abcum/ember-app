import Service from '@ember/service';
import feature from '../utils/features';
import { Promise } from 'rsvp';

export default Service.extend({

	watchid: null,

	current: null,

	find({ enableHighAccuracy = false, timeout = Infinity, maximumAge = 0 }) {

		return new Promise( (resolve, reject) => {

			if (this.watchid) return resolve(this.current);

			if (feature.fastboot() === true) return reject("Geolocation not supported");

			if (feature.geolocation() === false) return reject("Geolocation not supported");

			window.navigator.geolocation.getCurrentPosition(
				(result) => {
					this.set('current', result);
					resolve(result);
				},
				(reason) => {
					reject(reason);
				},
				{
					enableHighAccuracy: enableHighAccuracy,
					maximumAge: maximumAge,
					timeout: timeout,
				}
			);

		});

	},

	watch({ enableHighAccuracy = false, timeout = Infinity, maximumAge = 0 }) {

		return new Promise( (resolve, reject) => {

			if (this.watchid) return resolve(this.current);

			if (feature.fastboot() === true) return reject("Geolocation not supported");

			if (feature.geolocation() === false) return reject("Geolocation not supported");

			this.watchid = window.navigator.geolocation.watchPosition(
				(result) => {
					this.set('current', result);
					resolve(result);
				},
				(reason) => {
					reject(reason);
				},
				{
					enableHighAccuracy: enableHighAccuracy,
					maximumAge: maximumAge,
					timeout: timeout,
				}
			);

		});

	},

	clear() {

		if (this.watchid) navigator.geolocation.clearWatch(this.watchid);

	},

});

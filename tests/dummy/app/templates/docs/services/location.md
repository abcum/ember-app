# Location

The `location` service adds functionality for retrieving and watching the geolocation occordinates of the device from which the Ember app is being accessed.

The service is automatically injected inside all routes, controllers, and components.

## Get the location

The `find` method retrives the location from the browser using the HTML5 Geolocation API. It returns a Ember.RSVP.Promise, which will reject if the HTML5 Geolocation API is not available, or if the current coordinates are not able to be found, and will resolve if the positioning was successful. In addition the current geolocation position is saved to the `current` property.

{{docs-snippet name='docs-demo-services-location-controller-find.js'}}

It accepts an **optional** object as the first argument which can be used to customise the query. If omitted it will default to the values listed here.

```js
{
	enableHighAccuracy: false,
	timeout: Infinity,
	maximumAge: 0
}
```

## Watch the location

The `watch` method continually retrieves and tracks the location from the browser using the HTML5 Geolocation API. It returns a Ember.RSVP.Promise, which will reject if the HTML5 Geolocation API is not available, or if the current coordinates are not able to be found, and will resolve if the positioning was successful. In addition the current geolocation position is continually saved to the `current` property.

{{docs-snippet name='docs-demo-services-location-controller-watch.js'}}

It accepts an **optional** object as the first argument which can be used to customise the query. If omitted it will default to the values listed here.

```js
{
	enableHighAccuracy: false,
	timeout: Infinity,
	maximumAge: 0
}
```

## Stop all location monitoring

The `clear` method can be used to stop and unregister the location monitoring handler which was created using `watch`. 

{{docs-snippet name='docs-demo-services-location-controller-clear.js'}}

## Get the last coordinates

The `current` property stores the latest positioning data which was retrieved using the HTML5 Geolocation API, an example of which is displayed here.

```js
{
	coords: {
		accuracy: 75,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		latitude: 51.165,
		longitude: 0.248,
		speed: null
	},
	timestamp: 1470156731858
}
```

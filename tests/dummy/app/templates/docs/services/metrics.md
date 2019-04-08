# Metrics

The `metrics` service adds functionality for tracking app usage analytics using external analytics service providers. The built-in analytics providers include Google Analytics, Facebook Pixel, Mixpanel, Heap Analytics, and Intercom.

Integration is configured using the [`metrics`](/docs/config) configuration options. Page views are tracked automatically across all providers, meaning no custom page tracking code is required.

## Identifying a user

When a user has logged in to your app, or if a user's session data is already known, then you can use the `identify()` method to identify a user with the different analytics service providers.

The first argument is the `id` of the user, and the second argument is any attributable `data` for the user.

{{docs-snippet name='docs-demo-services-metrics-identify.js'}}

## Tracking a custom event

To track custom events, such as payments, subscriptions, searches, or adding items to a cart, then you can use the `trackEvent()` method to track an event, and the data for that event.

The first argument is the `name` of the event, and the second argument is any attributable `data` for the event.

{{docs-snippet name='docs-demo-services-metrics-event.js'}}

## Clearing user session indentifier

To clear any identifying information for the current session, use the `clear()` method. This is useful when a user has logged out of the application.

This method takes no arguments.

{{docs-snippet name='docs-demo-services-metrics-clear.js'}}


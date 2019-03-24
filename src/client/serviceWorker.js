/* eslint-disable */
workbox.core.skipWaiting();
workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


workbox.routing.registerRoute(
  new RegExp('^(http|https)://api.football-data.org/v2/.*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'APICache',
    // plugins: [
    //   new workbox.expiration.Plugin({
    //     cacheName: 'APICache',
    //     maxAgeSeconds: 60,
    //   }),
    // ],
  }),
  'GET'
);

// workbox.routing.registerRoute(
//   new RegExp('^(http|https)://upload.wikimedia.org/.*'),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'imagesCache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         cacheName: 'APICache',
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//       }),
//     ],
//   }),
//   'GET'
// );
/* eslint-enable */

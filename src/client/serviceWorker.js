import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

skipWaiting();
clientsClaim();

/* eslint-disable */
precacheAndRoute(self.__WB_MANIFEST);
/* eslint-enable */

registerRoute(
  new RegExp(`${process.env.APP_API_ROOT}`),
  new NetworkFirst({
    cacheName: 'APICache',
  }),
  'GET'
);

registerRoute(
  new RegExp('/*'),
  new NetworkFirst({
    cacheName: 'pagesCache',
  }),
  'GET'
);

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

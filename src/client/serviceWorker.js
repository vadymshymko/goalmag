import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

/* eslint-disable */
precacheAndRoute(self.__WB_MANIFEST);
/* eslint-enable */

registerRoute(
  new RegExp(`${process.env.APP_API_ROOT}.*`),
  new StaleWhileRevalidate({
    cacheName: 'APICache',
  }),
  'GET'
);

registerRoute(
  new RegExp('/ю*'),
  new StaleWhileRevalidate({
    cacheName: 'pagesCache',
  }),
  'GET'
);

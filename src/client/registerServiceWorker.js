const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js', {
          scope: '/',
        })
        .then(() => {
          console.log(`SW register success`);
        })
        .catch(err => {
          console.log(`SW register fail: ${err}`);
        });

      // navigator.serviceWorker.addEventListener('message', async event => {
      //   // Optional: ensure the message came from workbox-broadcast-update
      //   if (event.data.meta === 'workbox-broadcast-update') {
      //     const { cacheName, updatedUrl } = event.data.payload;

      //     console.log({
      //       cacheName,
      //       updatedUrl,
      //     });

      //     // Do something with cacheName and updatedUrl.
      //     // For example, get the cached content and update
      //     // the content on the page.
      //     // const cache = await caches.open(cacheName);
      //     // const updatedResponse = await cache.match(updatedUrl);
      //     // const updatedText = await updatedResponse.text();
      //   }
      // });

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      // navigator.addEventListener('waiting', () => {
      //   // `event.wasWaitingBeforeRegister` will be false if this is
      //   // the first time the updated service worker is waiting.
      //   // When `event.wasWaitingBeforeRegister` is true, a previously
      //   // updated same service worker is still waiting.
      //   // You may want to customize the UI prompt accordingly.

      //   // Assumes your app has some sort of prompt UI element
      //   // that a user can either accept or reject.
      //   const prompt = window.createUIPrompt({
      //     onAccept: async () => {
      //       // Assuming the user accepted the update, set up a listener
      //       // that will reload the page as soon as the previously waiting
      //       // service worker has taken control.
      //       navigator.addEventListener('controlling', () => {
      //         window.location.reload();
      //       });

      //       // Send a message telling the service worker to skip waiting.
      //       // This will trigger the `controlling` event handler above.
      //       // Note: for this to work, you have to add a message
      //       // listener in your service worker. See below.
      //       navigator.messageSW({
      //         type: 'SKIP_WAITING',
      //       });
      //     },

      //     onReject: () => {
      //       prompt.dismiss();
      //     },
      //   });
      // });
    });
  }
};

export default registerServiceWorker;

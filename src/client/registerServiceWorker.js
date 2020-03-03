const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js', { scope: '/' })
        .then(() => {
          console.log(`SW register success`);
        })
        .catch(err => {
          console.log(`SW register fail: ${err}`);
        });
    });
  }
};

export default registerServiceWorker;

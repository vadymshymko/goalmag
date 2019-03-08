const registerServiceWorker = ({ scope, url }) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(url, { scope }).then((registration) => {
        console.log(`SW register success: ${{ registration }}`);
      }).catch((err) => {
        console.log(`SW register fail: ${err}`);
      });
    });
  }
};

export default registerServiceWorker;

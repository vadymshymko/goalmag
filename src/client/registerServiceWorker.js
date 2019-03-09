const registerServiceWorker = ({ scope, url }) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(url, { scope });
    });
  }
};

export default registerServiceWorker;

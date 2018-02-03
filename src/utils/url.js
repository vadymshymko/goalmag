export const getURLLastPath = (url = '') => {
  if (!url) {
    return null;
  }

  return parseInt(url.substr(url.lastIndexOf('/') + 1), 10);
};

export default getURLLastPath;

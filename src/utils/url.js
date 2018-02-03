export const getURLLastPath = (url = '') => {
  if (!url) {
    return null;
  }

  return url.substr(url.lastIndexOf('/') + 1);
};

export default getURLLastPath;

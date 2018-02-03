export const isObject = obj => (
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object'
);

export const isArray = arr => (
  Array.isArray(arr)
);

export const convertStringToCamelCase = str => str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
  if (+match === 0) {
    return '';
  }

  return index === 0
    ? match.toLowerCase()
    : match.toUpperCase();
}).replace(/[^A-Za-z]/g, '');

export const convertObjKeysToCamelCase = (obj = {}) => {
  if (isObject(obj)) {
    return Object.keys(obj).reduce((result, key) => ({
      ...result,
      [convertStringToCamelCase(key)]: convertObjKeysToCamelCase(obj[key]),
    }), {});
  } else if (isArray(obj)) {
    return obj.map(convertObjKeysToCamelCase);
  }

  return obj;
};

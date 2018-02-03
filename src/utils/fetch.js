import httpRequest from 'isomorphic-fetch';
import { convertObjKeysToCamelCase } from 'utils';

export const fetch = (url, params) => (
  httpRequest(url, params).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  }).then(json => (
    convertObjKeysToCamelCase(json)
  ))
);

export default fetch;

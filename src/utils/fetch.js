import httpRequest from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

export const fetch = (url, params) => (
  httpRequest(url, params).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  }).then(camelizeKeys)
);

export default fetch;

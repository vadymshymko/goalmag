import httpRequest from 'isomorphic-fetch';

export const fetch = (url, params) => (
  httpRequest(url, params).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  })
);

export default fetch;

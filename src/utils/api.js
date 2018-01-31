import config from 'config';
import { fetch } from 'utils';

export const callApi = (endpoint) => {
  const requestUrl = (endpoint.indexOf(config.apiRoot) === -1)
    ? config.apiRoot + endpoint
    : endpoint;

  return fetch(requestUrl, {
    headers: {
      'X-Auth-Token': config.apiKey,
    },
  });
};

export default callApi;

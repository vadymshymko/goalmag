import config from 'config';
import { fetch } from 'utils';

const CALL_API_HEADERS = {
  'X-Auth-Token': config.apiKey,
};

export const callApi = (endpoint, {
  headers = {},
  ...params
} = {}) => {
  const requestUrl = (endpoint.indexOf(config.apiRoot) === -1)
    ? config.apiRoot + endpoint
    : endpoint;

  const requestHeaders = {
    ...CALL_API_HEADERS,
    ...headers,
  };

  return fetch(requestUrl, {
    headers: requestHeaders,
    ...params,
  });
};

export default callApi;

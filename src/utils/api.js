import config from 'config';
import { fetch } from 'utils';

const CALL_API_HEADERS = {
  'X-Auth-Token': config.apiKey,
};

let apiRequestsCount = 0;
let prevApiRequestDate = 0;

export const callApi = endpoint => new Promise((resolve) => {
  const requestUrl = (endpoint.indexOf(config.apiRoot) === -1)
    ? config.apiRoot + endpoint
    : endpoint;

  const requestDate = Date.now();
  const prevRequestDateDiff = requestDate - prevApiRequestDate;
  const isApiRequestEnabled = (
    apiRequestsCount < 50
    || prevRequestDateDiff > 90000
  );

  if (isApiRequestEnabled) {
    prevApiRequestDate = requestDate;
    apiRequestsCount = apiRequestsCount >= 50
      ? 1
      : apiRequestsCount + 1;

    resolve(fetch(requestUrl, {
      headers: CALL_API_HEADERS,
    }));
  }

  setTimeout(() => (
    resolve(callApi(endpoint))
  ), 90000);
});

export default callApi;

import config from 'config';
import { fetch, getDataFromLocalStorage, saveDataToLocalStorage } from 'utils';

const MAX_REQEUSTS_COUNT_PER_MINUTE = 50;

const CALL_API_HEADERS = {
  'X-Auth-Token': config.apiKey,
};

export const callApi = endpoint => new Promise((resolve) => {
  const requestDate = Date.now();

  const prevApiRequestDate = getDataFromLocalStorage('prevApiRequestDate') || 0;
  const apiRequestsCount = getDataFromLocalStorage('apiRequestsCount') || 0;

  const prevRequestDateDiff = requestDate - prevApiRequestDate;
  const isApiRequestEnabled = (
    apiRequestsCount < MAX_REQEUSTS_COUNT_PER_MINUTE
    || prevRequestDateDiff > 61000
  );

  if (isApiRequestEnabled) {
    saveDataToLocalStorage('prevApiRequestDate', requestDate);
    saveDataToLocalStorage('apiRequestsCount', apiRequestsCount >= MAX_REQEUSTS_COUNT_PER_MINUTE
      ? 1
      : apiRequestsCount + 1);

    const requestUrl = (endpoint.indexOf(config.apiRoot) === -1)
      ? config.apiRoot + endpoint
      : endpoint;

    resolve(fetch(requestUrl, {
      headers: CALL_API_HEADERS,
    }));
  }

  setTimeout(() => (
    resolve(callApi(endpoint))
  ), 61000 - prevRequestDateDiff);
});

export default callApi;

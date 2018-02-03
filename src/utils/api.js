import config from 'config';
import { fetch, getDataFromLocalStorage, saveDataToLocalStorage } from 'utils';

const CALL_API_HEADERS = {
  'X-Auth-Token': config.apiKey,
};

export const callApi = endpoint => new Promise((resolve) => {
  const apiRequestsCount = getDataFromLocalStorage('apiRequestsCount') || 0;
  const prevApiRequestDate = getDataFromLocalStorage('prevApiRequestDate') || 0;

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
    saveDataToLocalStorage('prevApiRequestDate', requestDate);
    saveDataToLocalStorage('apiRequestsCount', apiRequestsCount >= 50
      ? 1
      : apiRequestsCount + 1);

    resolve(fetch(requestUrl, {
      headers: CALL_API_HEADERS,
    }));
  }

  setTimeout(() => (
    resolve(callApi(endpoint))
  ), 90000);
});

export default callApi;

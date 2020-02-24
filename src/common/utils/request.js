import axios from 'axios';
import { camelizeKeys } from 'humps';

export const request = async params => {
  const response = await axios(params);

  return camelizeKeys(response.data);
};

export const callApi = async (endpoint, params = {}) => {
  const requestURL = `${process.env.APP_API_ROOT}${endpoint}${
    endpoint.includes('?') ? '&' : '?'
  }Authorization=${process.env.APP_API_KEY}`;

  const response = await request({
    ...params,
    url: requestURL,
  });

  return response;
};

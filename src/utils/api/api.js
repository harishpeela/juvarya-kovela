import axios from 'axios';
import base64 from 'react-native-base64';
import {
  getAuthTokenDetails,
  getClientCredentials,
  removeLoginSessionDetails,
  saveUserDetails,
} from '../preferences/localStorage';
import Snackbar from 'react-native-snackbar';
import {allTexts} from '../../common';
import RNRestart from 'react-native-restart';

export const BASE_URL = 'http://20.255.59.150:8082/api/';

export const authAxiousInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
  },
});

export const authAxiosAddTempId = axios.create({
  baseURL: BASE_URL,
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: 'Basic' + base64.encode('skillrat-clint:skillrat@2021'),
});

export const axiousInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
  },
});
axiousInstance.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  let clientToken = await getClientCredentials();
  console.log(
    'Sending req with this token is',
    token || clientToken.clientToken,
  );
  config.headers.Authorization = token || clientToken.clientToken;
  return config;
});

export const axiosMultiPartFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: '*',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
  },
});
axiosMultiPartFormData.interceptors.request.use(async function (config) {
  let token = await getAuthTokenDetails();
  let clientToken = await getClientCredentials();
  console.log('Sending req with this token', token || clientToken.clientToken);
  config.headers.Authorization = token || clientToken.clientToken;
  return config;
});

axiousInstance.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      let token = await getAuthTokenDetails();
      if (token) {
        console.log('Unauthorized eror');
        await removeLoginSessionDetails();
        saveUserDetails('');
        RNRestart.Restart();
        return axios(config);
      }
    }
    return Promise.reject(error);
  },
);
axiousInstance.interceptors.response.use(
  response => response,
  async error => {
    const {config, message} = error;
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    // retry while Network timeout or Network Error
    if (!(message.includes('timeout') || message.includes('Network Error'))) {
      return Promise.reject(error);
    }
    config.retry -= 1;
    const delayRetryRequest = new Promise(resolve => {
      setTimeout(() => {
        console.log('retry the request', config.url);
        resolve();
      }, config.retryDelay || 1000);
    });
    Snackbar.show({
      text: allTexts.constants.noInternet,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'Try again',
        textColor: 'green',
        onPress: () => {},
      },
    });
    return delayRetryRequest.then(() => axios(config));
  },
);

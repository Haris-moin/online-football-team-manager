import { notification } from 'antd';
import axios from 'axios';
import { signOutSuccess } from '../store/slices/authSlice';
import { removeItemFromLocalStorage } from '../utils/utils';
import { AUTH_TOKEN } from '../constants/constants';
import store from '../store';


const service = axios.create({
  timeout: 300000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const TOKEN_PAYLOAD_KEY = 'authorization';

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const cloneConfig = { ...config };
    const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;

    if (jwtToken) {
      cloneConfig.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }

    return cloneConfig;
  },
  (error) => {
    notification.error({
      message: 'Error'
    });
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response) => (response?.data),
  (error) => {
    const notificationParam = {
      message: ''
    };

    if (!error?.response || error?.response?.status === 401) {
      const keysToRemove = [AUTH_TOKEN];
      keysToRemove.forEach((key) => removeItemFromLocalStorage(key));
      notificationParam.message = error?.response?.data?.message || 'Your Session has expired';
      store.dispatch(signOutSuccess());
    }

    if (error?.response?.status === 404) {
      notificationParam.message = error?.response?.data?.message || 'Not Found"';
    }

    if (error?.response?.status === 500) {
      notificationParam.message = error?.response?.data?.message || 'Internal Server Error';
    }

    if (notificationParam.message) {
      notification.error(notificationParam);
    }

    return Promise.reject(error);
  }
);

export default service;
import { notification } from "antd";
import axios from "axios";
import {
  AUTH_TOKEN,
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGE_MAP,
  TOKEN_PAYLOAD_KEY,
} from "../constants/constants";
import UserService from "../services/authServices";
import { getValueFromLocalStorage } from "../utils/utils";

const service = axios.create({
  timeout: 300000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    const cloneConfig = { ...config };
    const jwtToken = getValueFromLocalStorage(AUTH_TOKEN) || null;

    if (jwtToken) {
      cloneConfig.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }

    return cloneConfig;
  },
  (error) => {
    notification.error({
      message: "Error",
    });
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;
      const message =
        data?.message || ERROR_MESSAGE_MAP[status] || DEFAULT_ERROR_MESSAGE;
      if (status === 401) {
       UserService.logout();
      }

      notification.error({ message });
    } else {
      notification.error({
        message: "Network error. Please check your connection.",
      });
    }

    return Promise.reject(error);
  }
);
export default service;

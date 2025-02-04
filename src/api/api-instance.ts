import { notification } from "antd";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

export type ResponseType<T> = {
  isSuccess: boolean;
  error: { type: string; message: string } | null;
  data: T | null;
};

export const BASE_URL =
  "https://app-vms-core-test-gzc2fcffh8hnhpdw.germanywestcentral-01.azurewebsites.net";

const service = () => {
  const token = localStorage.getItem("ROCP_token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Max-Age": 86400,
    "Access-Control-Allow-Origin": "*",
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const requestResolve = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    return config;
  };

  const responseResolve = (res: AxiosResponse) => {
    if (!res.data.isSuccess) {
      throw new Error(res.data.error.message);
    }
    return res.data;
  };

  const responseReject = (err: AxiosError) => {
    // Handle network errors
    if (err.message === "Network Error") {
      notification.error({
        message: "Network Error",
        description:
          "No internet connection. Please check your network and try again.",
      });
      return Promise.reject(err);
    }

    // Handle specific HTTP error status codes
    const error = err.response;
    if (error?.status === 422) {
      notification.error({
        message: "Validation Error",
        description:
          "The request could not be processed due to validation issues.",
      });
    } else if (error?.status === 404) {
      notification.error({
        message: "Not Found",
        description: "The requested resource could not be found.",
      });
    } else if (error?.status === 500) {
      notification.error({
        message: "Server Error",
        description:
          "An internal server error occurred. Please try again later.",
      });
    }

    // Generic error handling for other cases
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      notification.error({
        message: "Request Error",
        description: "An unexpected error occurred.",
      });
    } else if (err.request) {
      // The request was made but no response was received
      notification.error({
        message: "No Response",
        description: "The server did not respond to the request.",
      });
    }

    return Promise.reject(err);
  };

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    withCredentials: true,
    headers,
  });

  instance.interceptors.request.use(requestResolve);
  instance.interceptors.response.use(responseResolve, responseReject);

  return instance;
};

export const API = service();

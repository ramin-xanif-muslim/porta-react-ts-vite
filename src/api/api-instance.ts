import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

export type ResponseType<T> = {
  isSuccess: boolean;
  error: string | null;
  data: T;
}

export const BASE_URL =
  "https://vms-core-gdh7ekf4cffjb7bq.westeurope-01.azurewebsites.net";

const service = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Max-Age': 86400,
    'Access-Control-Allow-Origin': '*',
  };

  const requestResolve = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  };

  const responseResolve = (res: AxiosResponse) => {
    return res.data;
  };

  const responseReject = (err: AxiosError) => {
    const error = err.response;

    if (error?.status === 422) {
      console.log(error.data);
    } else if (error?.status === 404) {
      console.log(error.data);
    }

    return Promise.reject(err);
  };

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    withCredentials: true,
    headers
  });

  instance.interceptors.request.use(requestResolve);

  instance.interceptors.response.use(responseResolve, responseReject);

  return instance;
};

export const API = service();


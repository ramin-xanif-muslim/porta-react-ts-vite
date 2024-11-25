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
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Max-Age": 86400,
        "Access-Control-Allow-Origin": "*",
    };

    const requestResolve = (
        config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
        // console.log("requestResolve", config);
        return config;
    };

    const responseResolve = (res: AxiosResponse) => {
        // console.log("responseResolve", res.data);

        if (!res.data.isSuccess) {
            notification.error({
                message: "Error",
                description: res.data.error.message,
            });
            return Promise.reject(res.data);
        }
        return res.data;
    };

    const responseReject = (err: AxiosError) => {
        // console.log("responseReject", err);
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
        headers,
    });

    instance.interceptors.request.use(requestResolve);

    instance.interceptors.response.use(responseResolve, responseReject);

    return instance;
};

export const API = service();

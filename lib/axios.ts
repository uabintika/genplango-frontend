import { baseURL } from "@/config";
import axios, { AxiosResponse } from "axios";

const api = axios;

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;
api.defaults.baseURL = baseURL;

// Add a response interceptor
api.interceptors.response.use(
  function onFulfilled(response: AxiosResponse): AxiosResponse {
    return response;
  },
  function onRejected(error) {
    if (error.status === 401) {
      // redirect to login
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;

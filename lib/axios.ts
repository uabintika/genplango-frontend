import { baseURL } from "@/config";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Add a response interceptor
api.interceptors.response.use(
  function onFulfilled(response: AxiosResponse): AxiosResponse {
    return response;
  },
  function onRejected(error) {
    if (error.status === 401) {
      // redirect to login
      
      return Promise.reject(error);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;

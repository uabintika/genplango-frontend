"use client";

import { baseURL } from "@/config";
import { ROUTES } from "@/routes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

const AxiosInterceptor = ({ children }: Children) => {
  const router = useRouter();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: AxiosError) => {
      if (error?.response?.status === 401) {
        router.replace(ROUTES.AUTH.LOGIN);
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return instance.interceptors.response.eject(interceptor);
  }, [router]);

  return children;
};

export default instance;
export { AxiosInterceptor };

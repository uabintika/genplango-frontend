"use client";

import api, { AxiosInterceptor } from "@/lib/axios";
import { SWRConfig } from "swr";

function BaseSWRConfig({ children }: Children) {
  return (
    <AxiosInterceptor>
      <SWRConfig
        value={{
          fetcher: async (resource, init) => {
            const res = await api(resource, init);
            return res.data;
          },
        }}
      >
        {children}
      </SWRConfig>
    </AxiosInterceptor>
  );
}

export default BaseSWRConfig;

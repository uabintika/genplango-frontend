"use client";

import useSWR from "swr";
import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";
import { apiURL } from "@/config";

const csrfCookieFetcher = async (url: string) => await api.get(url);

export default function LoginPage() {
  const { error, mutate } = useSWR(
    apiURL + API_ROUTES.AUTH.CSRF,
    csrfCookieFetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );

  return <div>Login page</div>;
}

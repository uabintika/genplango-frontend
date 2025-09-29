"use client";

import { createContext, useContext } from "react";
import { AuthContextType, User } from "../types/auth";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import api from "@/lib/axios";
import { ROUTES } from "@/routes";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const userFetcher = async (url: string) =>
  api.post(url).then((res) => res.data.user);

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: async () => null,
  logout: async () => {},
});

export function AuthProvider({ children }: Children) {
  const router = useRouter();
  const t = useTranslations();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<Nullable<User>>(API_ROUTES.AUTH.CURRENT_USER, userFetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const setUser = async (newUser: Nullable<User>) =>
    await mutate(newUser, false);

  const logout = async () => {
    try {
      const response = await api.post(API_ROUTES.AUTH.LOGOUT);

      if (response.status === 200) {
        setUser(null);
        router.push(ROUTES.AUTH.LOGIN);
        toast.success(t("Misc.logout_success"));
      }
    } catch (error) {
      toast.error(t("Misc.logout_error"));
    }
  };

  const loading = !user && !error;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: loading,
        setUser: setUser,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

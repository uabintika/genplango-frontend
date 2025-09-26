"use client";

import { createContext, useContext } from "react";
import { AuthContextType, User } from "../types/auth";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import api from "@/lib/axios";
import { ROUTES } from "@/routes";
import { API_ROUTES } from "@/routes/api";

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  mutateUser: async () => {},
  logout: async () => {},
  loading: true,
});

export const userFetcher = async (url: string) => {
  return await api.get(url).then((res) => res.data);
};

export function AuthProvider({ children }: Children) {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(API_ROUTES.AUTH.CURRENT_USER, userFetcher, {
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push(ROUTES.AUTH.LOGIN);
      }
    },
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const logout = () => {
    return api
      .post(API_ROUTES.AUTH.LOGOUT)
      .then(() => {
        router.push(ROUTES.AUTH.LOGIN);
      })
      .catch(() => {
        // error
      });
  };

  const loading = !user && !error;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        setUser: (newUser) => mutate<Nullable<User>>(newUser, false),
        mutateUser: mutate,
        logout: logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

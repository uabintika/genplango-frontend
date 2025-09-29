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
  loading: true,
  setUser: () => {},
  mutateUser: async () => null,
  logout: async () => {},
});

export const userFetcher = (url: string) => {
  return api.get(url).then((res) => res.data);
};

export function AuthProvider({ children }: Children) {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(API_ROUTES.AUTH.CURRENT_USER, userFetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const logout = async () => {
    try {
      const response = await api.post(API_ROUTES.AUTH.LOGOUT);

      if (response.status === 200) {
        router.push(ROUTES.AUTH.LOGIN);
      }
    } catch (error) {
      //
    }
  };

  const loading = !user && !error;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: loading,
        setUser: (newUser) => mutate<Nullable<User>>(newUser, false),
        mutateUser: mutate,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

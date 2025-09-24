"use client";

import { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "../types/auth";

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: Children) {
  const [user, setUser] = useState<Nullable<User>>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

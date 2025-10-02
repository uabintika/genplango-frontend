export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  duty: Nullable<string>;
  permissions: Array<string>;
};

export type AuthContextType = {
  user: Nullable<User>;
  loading: boolean;
  setUser: (newUser: Nullable<User>) => Promise<Nullable<User> | undefined>;
  logout: () => Promise<void>;
};

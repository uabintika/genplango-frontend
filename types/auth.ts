export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  duty: string | null;
  permissions: Array<string>;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (newUser: User | null) => Promise<User | null | undefined>;
  logout: () => Promise<void>;
};

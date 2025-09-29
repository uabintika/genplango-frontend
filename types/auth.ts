export type User = {
  id: number;
  firstName: string;
  lastLame: string;
  email: string;
  phoneNumber: string;
  duty: Nullable<string>;
  permissions: Array<string>;
};

export type AuthContextType = {
  user: Nullable<User>;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<Nullable<User>>>;
  mutateUser: () => Promise<Nullable<User>>;
  logout: () => Promise<void>;
};

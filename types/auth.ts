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
  setUser: React.Dispatch<React.SetStateAction<Nullable<User>>>;
  mutateUser: () => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
};

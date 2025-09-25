declare global {
  type Children = Readonly<{
    children: React.ReactNode;
  }>;

  type Nullable<T> = T | null;
}

export {};

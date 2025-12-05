declare global {
  type Children = Readonly<{
    children: React.ReactNode;
  }>;

  type ListMeta = {
    prevCursor: string | null;
    nextCursor: string | null;
    path: string;
    perPage: number;
  };

  type ListLinks = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };

  type InfinityScrollData<T> = {
    data: Array<T>;
    links: ListLinks;
    meta: ListMeta;
  };

  type Municipality = {
    id: number;
    name: string;
  };
}

export {};

"use client";

import * as React from "react";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableFilters } from "@/app/(protected)/admin/service-recipients/_components/table";

export default function useInfiniteScroll<T>(
  apiRoute: string,
  tableContainerRef: React.RefObject<HTMLTableElement | null>,
  fetcher: (url: string) => Promise<InfinityScrollData<T>>,
  columns: ColumnDef<T>[],
  filters: TableFilters | null = null,
  swrConfig: SWRInfiniteConfiguration = {},
  pageSize: number = 15
) {
  const getKey = React.useCallback(
    (pageIndex: number, previousPageData: InfinityScrollData<T> | null) => {
      if (previousPageData && previousPageData.data.length === 0) return null;

      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters || {}).filter(
            ([, value]) => value !== null && value !== undefined && value !== ""
          )
        ) as Record<string, string>
      ).toString();

      if (pageIndex === 0) return `${apiRoute}?${queryString}`;

      return `${apiRoute}?cursor=${previousPageData?.meta?.nextCursor}&${queryString}`;
    },
    [filters]
  );

  const { data, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite<InfinityScrollData<T>>(getKey, fetcher, {
      revalidateFirstPage: false,
      ...swrConfig,
    });

  const flatData = React.useMemo(
    () => data?.flatMap((page) => page.data) ?? [],
    [data]
  );

  React.useEffect(() => {
    if (!isLoading && !isValidating && size > 1) {
      setSize(1);
    }
  }, [filters]);

  const table = useReactTable<T>({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < pageSize);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!tableContainerRef?.current) return;

      const { scrollHeight } = tableContainerRef.current;

      const isNearBottom =
        window.innerHeight +
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) >
        scrollHeight - 100;

      if (
        isNearBottom &&
        !isLoading &&
        !isValidating &&
        !isReachingEnd &&
        !isEmpty
      ) {
        setSize((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isValidating, isReachingEnd, isEmpty, tableContainerRef]);

  return { table, isLoading, isValidating, isReachingEnd, mutate };
}

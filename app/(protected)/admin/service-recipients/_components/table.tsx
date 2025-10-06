"use client";

import * as React from "react";
import useSWRInfinite from "swr/infinite";
import { Loader2 } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import useServiceRecipientsTableColumns from "./table-columns";

export type ServiceRecipient = {
  id: number;
  firstName: string;
  lastName: string;
  gender: number;
  status: number;
  relative: ServiceRecipient | null;
};

const serviceRecipientsFetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

const PAGE_SIZE = 15;

export default function ServiceRecipientsTable() {
  const columns = useServiceRecipientsTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const t = useTranslations("ServiceRecipients.Table");

  const getKey = (
    pageIndex: number,
    previousPageData: InfinityScrollData<ServiceRecipient>
  ) => {
    if (previousPageData && previousPageData.data.length === 0) return null;

    if (pageIndex === 0) return API_ROUTES.SERVICE_RECIPIENTS.INDEX;

    return `${API_ROUTES.SERVICE_RECIPIENTS.INDEX}?cursor=${previousPageData.meta.nextCursor}`;
  };

  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite<
    InfinityScrollData<ServiceRecipient>
  >(getKey, serviceRecipientsFetcher);

  const flatData = React.useMemo(
    () => data?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const table = useReactTable<ServiceRecipient>({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isReachingEnd =
    (data && data[data.length - 1]?.data.length === 0) ||
    (data && data[data.length - 1]?.data.length < PAGE_SIZE);

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

      if (isNearBottom && !isLoading && !isValidating && !isReachingEnd) {
        setSize((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isValidating, isReachingEnd]);

  return (
    <>
      {/* insert filter here */}
      <Table ref={tableContainerRef}>
        <TableHeader className="bg-default-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-lg font-semibold"
              >
                {!isLoading ? (
                  t("no_results")
                ) : (
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

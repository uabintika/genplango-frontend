"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { flexRender } from "@tanstack/react-table";

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
import useServiceRecipientsTableColumns from "./table-columns";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

export type ServiceRecipient = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  status: ServiceRecipientStatus;
  relative: ServiceRecipient | null;
};

const serviceRecipientsFetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default function ServiceRecipientsTable() {
  const columns = useServiceRecipientsTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const { table, isLoading, isValidating } =
    useInfiniteScroll<ServiceRecipient>(
      API_ROUTES.SERVICE_RECIPIENTS.INDEX,
      tableContainerRef,
      serviceRecipientsFetcher,
      columns
    );

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
          {table.getRowModel().rows?.length !== 0 &&
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
            ))}

          {(isLoading || isValidating) && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-lg font-semibold"
              >
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

import {
  type ColumnDef,
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import * as React from "react";
import Loader from "./loader";
import DataTablePagination from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  table: TableType<TData>;
  tableRef: React.RefObject<HTMLTableElement | null>;
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  showPagination?: boolean;
}

export interface DataTableResponseData<T> {
  data: T[];
  from: number;
  to: number;
  path: string;
  currentPage: number;
  currentPageUrl: string;
  firstPageUrl: string;
  nextPageUrl: string | null;
  perPage: number;
  prevPageUrl: string | null;
}

export function DataTable<TData, TValue>({
  table,
  tableRef,
  columns,
  isLoading = false,
  showPagination = false,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table ref={tableRef} className={cn(isLoading && "animate-pulse")}>
          <TableHeader className="bg-default-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === 150 ? "auto" : header.getSize(),
                      }}
                    >
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-lg font-semibold"
                >
                  <Loader size="lg" className="mx-auto" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </>
  );
}

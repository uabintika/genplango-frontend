import * as React from "react";
import { Table as DataTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  ref?: React.Ref<HTMLTableElement>;
}

const Table = ({ className, ref, ...rest }: TableProps) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...rest}
    />
  </div>
);

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableHeader = ({ className, ref, ...rest }: TableHeaderProps) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b [&_tr]:border-t", className)}
    {...rest}
  />
);

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableBody = ({ className, ref, ...rest }: TableBodyProps) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...rest}
  />
);

interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableFooter = ({ className, ref, ...rest }: TableFooterProps) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium last:[&>tr]:border-b-0",
      className
    )}
    {...rest}
  />
);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: React.Ref<HTMLTableRowElement>;
}

const TableRow = ({ className, ref, ...rest }: TableRowProps) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-default-100 dark:border-default-300 transition-colors data-[state=selected]:bg-muted",
      className
    )}
    {...rest}
  />
);

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  ref?: React.Ref<HTMLTableCellElement>;
}

const TableHead = ({ className, ref, ...rest }: TableHeadProps) => (
  <th
    ref={ref}
    className={cn(
      "h-14 px-6 border-default-100 text-default-900 text-xs uppercase whitespace-nowrap text-start align-middle font-medium [&:has([role=checkbox])]:pe-0",
      className
    )}
    {...rest}
  />
);

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  ref?: React.Ref<HTMLTableCellElement>;
}

const TableCell = ({ className, ref, ...rest }: TableCellProps) => (
  <td
    ref={ref}
    className={cn(
      "px-6 h-14 text-default-600 text-sm font-normal capitalize align-middle [&:has([role=checkbox])]:pe-0",
      className
    )}
    {...rest}
  />
);

interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  ref?: React.Ref<HTMLTableCaptionElement>;
}

const TableCaption = ({ className, ref, ...rest }: TableCaptionProps) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...rest}
  />
);

interface DataTablePaginationProps {
  table: DataTable<any>;
}

const TablePagination = ({ table }: DataTablePaginationProps) => {
  return (
    <div className="flex items-center justify-end py-4 px-10">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex items-center gap-2 flex-none">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="w-8 h-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {table.getPageOptions().map((page, pageIndex) => (
          <Button
            key={`basic-data-table-${pageIndex}`}
            onClick={() => table.setPageIndex(pageIndex)}
            size="icon"
            className="w-8 h-8"
            variant={
              table.getState().pagination.pageIndex === pageIndex
                ? "default"
                : "outline"
            }
          >
            {page + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="w-8 h-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePagination,
};

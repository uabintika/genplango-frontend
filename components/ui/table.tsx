import * as React from "react";
import { cn } from "@/lib/utils";

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

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

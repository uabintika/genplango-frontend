"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useServiceRecipientsTableColumns from "./table-columns";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import UserTableFilters from "./table-filter";
import { DataTable } from "@/components/ui/data-table";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  duty: string;
};

export type TableFilters = {
  search: string | null;
};

const usersFetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default function UsersTable() {
  const columns = useServiceRecipientsTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters, setFilters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating } = useInfiniteScroll<User>(
    API_ROUTES.USERS.INDEX,
    tableContainerRef,
    usersFetcher,
    columns,
    filters
  );

  return (
    <>
      <UserTableFilters
        isLoading={isLoading}
        isValidating={isValidating}
        setFilters={setFilters}
      />
      <DataTable
        table={table}
        tableRef={tableContainerRef}
        columns={columns}
        isLoading={isLoading || isValidating}
      />
    </>
  );
}

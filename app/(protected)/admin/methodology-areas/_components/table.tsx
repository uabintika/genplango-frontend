"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useMethodologyAreaTableColumns from "./table-columns";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import MethodologyAreaTableFilters from "./table-filter";
import { DataTable } from "@/components/ui/data-table";

export type TableMethodologyAreaData = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TableFilters = {
  search: string | null;
};

const methodologyAreasFetches = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default function MethodologyAreasTable() {
  const columns = useMethodologyAreaTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters, setFilters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating } =
    useInfiniteScroll<TableMethodologyAreaData>(
      API_ROUTES.METHODOLOGY_AREAS.INDEX,
      tableContainerRef,
      methodologyAreasFetches,
      columns,
      filters
    );

  return (
    <>
      <MethodologyAreaTableFilters
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

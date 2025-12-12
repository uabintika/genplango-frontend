"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useMunicipalityTableColumns from "./table-columns";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import MunicipalityTableFilters from "./table-filter";
import { DataTable } from "@/components/ui/data-table";

export type TableMunicipalityData = {
  id: number;
  institutionId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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

export default function MunicipalitiesTable() {
  const columns = useMunicipalityTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters, setFilters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating } =
    useInfiniteScroll<TableMunicipalityData>(
      API_ROUTES.MUNICIPALITIES.INDEX,
      tableContainerRef,
      usersFetcher,
      columns,
      filters
    );

  return (
    <>
      <MunicipalityTableFilters
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

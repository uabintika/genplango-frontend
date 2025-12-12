"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useKinshipRelationTableColumns from "./table-columns";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import KinshipRelationTableFilters from "./table-filter";
import { DataTable } from "@/components/ui/data-table";

export type TableKinshipRelationData = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TableFilters = {
  search: string | null;
};

const kinshipsFetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default function KinshipRelationsTable() {
  const columns = useKinshipRelationTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters, setFilters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating } =
    useInfiniteScroll<TableKinshipRelationData>(
      API_ROUTES.KINSHIP_RELATIONS.INDEX,
      tableContainerRef,
      kinshipsFetcher,
      columns,
      filters
    );

  return (
    <>
      <KinshipRelationTableFilters
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

"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { Gender, WorkerStatus } from "@/types/enum.types";
import { DataTable } from "@/components/ui/data-table";
import useWorkersTableColumns from "./table-columns";
import WorkerTableFilters from "./table-filter";

export type Worker = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  status: WorkerStatus;
  coordinators: number[];
  assignedServiceRecipients: number[];
};

export type TableFilters = {
  search: string | null;
};

const workersFetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default function WorkersTable() {
  const columns = useWorkersTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters, setFilters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating } = useInfiniteScroll<Worker>(
    API_ROUTES.WORKERS.INDEX,
    tableContainerRef,
    workersFetcher,
    columns,
    filters
  );

  return (
    <>
      <WorkerTableFilters
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

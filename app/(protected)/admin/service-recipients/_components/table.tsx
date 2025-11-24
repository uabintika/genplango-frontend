"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useServiceRecipientsTableColumns from "./table-columns";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import ServiceRecipientTableFilters from "./table-filter";
import { Gender, ServiceRecipientStatus } from "@/types/global-types";
import { DataTable } from "@/components/ui/data-table";

export type ServiceRecipient = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  status: ServiceRecipientStatus;
  relative: ServiceRecipient | null;
};

export type TableFilters = {
  search: string | null;
};

const serviceRecipientsFetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default function ServiceRecipientsTable() {
  const columns = useServiceRecipientsTableColumns();
  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters, setFilters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating } =
    useInfiniteScroll<ServiceRecipient>(
      API_ROUTES.SERVICE_RECIPIENTS.INDEX,
      tableContainerRef,
      serviceRecipientsFetcher,
      columns,
      filters
    );

  return (
    <>
      <ServiceRecipientTableFilters
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

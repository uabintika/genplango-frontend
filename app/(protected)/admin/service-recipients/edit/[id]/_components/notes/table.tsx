"use client";

import * as React from "react";

import api from "@/lib/axios";
import { API_ROUTES } from "@/routes/api";

// UI Components
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { DataTable } from "@/components/ui/data-table";
import { ListNote } from "../../schemas/notes.schema";
import useNotesColumns from "./table-columns";

export type TableFilters = {
  search: string | null;
};

const notesFetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export type NotesTableRef = {
  refresh: () => Promise<void>;
};

type NotesTableProps = {
  serviceRecipientId: number;
  handleNoteRemove: (id: number) => Promise<void>;
  handleOpenEditNoteModal: (item: ListNote) => void;
  ref?: React.Ref<NotesTableRef>;
};

export default function NotesTable({
  serviceRecipientId,
  handleNoteRemove,
  handleOpenEditNoteModal,
  ref,
}: NotesTableProps) {
  const columns = useNotesColumns({
    handleNoteRemove,
    handleOpenEditNoteModal,
  });

  const tableContainerRef = React.useRef<HTMLTableElement>(null);
  const [filters] = React.useState<TableFilters>({ search: null });
  const { table, isLoading, isValidating, mutate } =
    useInfiniteScroll<ListNote>(
      API_ROUTES.SERVICE_RECIPIENTS.NOTES.INDEX(serviceRecipientId),
      tableContainerRef,
      notesFetcher,
      columns,
      filters
    );

  React.useImperativeHandle(ref, () => ({
    refresh: async () => {
      await mutate();
    },
  }));

  return (
    <>
      {/* <NotesFilters
        isLoading={isLoading}
        isValidating={isValidating}
        setFilters={setFilters}
      /> */}
      <DataTable
        table={table}
        tableRef={tableContainerRef}
        columns={columns}
        isLoading={isLoading || isValidating}
      />
    </>
  );
}

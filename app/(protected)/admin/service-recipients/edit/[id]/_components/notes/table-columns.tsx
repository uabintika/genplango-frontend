"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, SquarePen, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Authorable, ListNote } from "../../schemas/notes.schema";
import { NoteType } from "@/types/enum.types";
import { useNotesOptions } from "@/hooks/use-enum";

type UseNotesColumnsProps = {
  handleNoteRemove: (id: number) => Promise<void>;
  handleOpenEditNoteModal: (item: ListNote) => void;
};

export default function useNotesColumns({
  handleNoteRemove,
  handleOpenEditNoteModal,
}: UseNotesColumnsProps): ColumnDef<ListNote>[] {
  const { map: types } = useNotesOptions();

  return React.useMemo<ColumnDef<ListNote>[]>(
    () => [
      {
        accessorKey: "id",
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <div className="xl:w-16">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "authorable",
        header: "Autorius",
        cell: ({ getValue }) => {
          const author = getValue<Authorable>();
          return <p>{author.firstName + " " + author.lastName}</p>;
        },
      },
      {
        accessorKey: "type",
        header: "Tipas",
        cell: ({ getValue }) => {
          const type = getValue<NoteType>();
          return (
            <Badge className={cn("rounded-full px-5")}>{types[type]}</Badge>
          );
        },
      },
      {
        accessorKey: "useForAi",
        header: "Naudoja DI",
        cell: ({ getValue }) => {
          return <>{getValue<boolean>() && <Check />}</>;
        },
      },
      {
        accessorKey: "description",
        header: "Aprašymas",
        cell: ({ getValue }) => {
          return <p className="max-w-[300px] truncate">{getValue<string>()}</p>;
        },
      },
      {
        id: "actions",
        header: "Veiksmai",
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300 text-default-400"
                      color="secondary"
                      onClick={() => handleOpenEditNoteModal(row.original)}
                    >
                      <SquarePen className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Redaguoti</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300 text-default-400"
                      color="secondary"
                      onClick={async () =>
                        await handleNoteRemove(row.original.id)
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-destructive text-destructive-foreground"
                  >
                    <p>Šalinti</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
      },
    ],
    []
  );
}

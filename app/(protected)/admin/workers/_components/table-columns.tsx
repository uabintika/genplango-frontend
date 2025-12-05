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
import { SquarePen, Trash2 } from "lucide-react";
import { Worker } from "./table";
import { ColumnDef } from "@tanstack/react-table";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { useGenderOptions, useWorkerStatusOptions } from "@/hooks/use-enum";
import { WorkerStatus } from "@/types/enum.types";

export default function useWorkersTableColumns(): ColumnDef<Worker>[] {
  const { map: genders } = useGenderOptions();
  const { map: workerStatuses } = useWorkerStatusOptions();

  return React.useMemo<ColumnDef<Worker>[]>(
    () => [
      {
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
        header: "Pilnas vardas",
        cell: ({ row }) => (
          <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
        ),
      },
      {
        accessorKey: "gender",
        header: "Lytis",
        cell: ({ getValue }) => {
          return <span>{genders[getValue<number>()]}</span>;
        },
      },
      {
        header: "Kontaktai",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-semibold">{row.original.email}</span>
              <span className="font-semibold">{row.original.phoneNumber}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Statusas",
        cell: ({ row }) => {
          const statusColors: Record<number, string> = {
            [WorkerStatus.Working]: "bg-success/20 text-success",
            [WorkerStatus.NotWorking]: "bg-destructive/20 text-destructive",
          };
          const status = row.getValue<number>("status");
          const statusStyles = statusColors[status];
          return (
            <Badge className={cn("rounded-full px-5", statusStyles)}>
              {workerStatuses[status]}
            </Badge>
          );
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
                    <Link href={ROUTES.ADMIN.WORKERS.UPDATE(row.original.id)}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300 text-default-400"
                        color="secondary"
                      >
                        <SquarePen className="w-3 h-3" />
                      </Button>
                    </Link>
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

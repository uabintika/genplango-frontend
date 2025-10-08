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
import { ServiceRecipient } from "./table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ROUTES } from "@/routes";

export default function useServiceRecipientsTableColumns(): ColumnDef<ServiceRecipient>[] {
  const t = useTranslations("ServiceRecipients.Table.Header");
  const actionsT = useTranslations("TableActions");
  const enumsT = useTranslations("Enums");

  return React.useMemo<ColumnDef<ServiceRecipient>[]>(
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
        header: t("fullName"),
        cell: ({ row }) => (
          <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
        ),
      },
      {
        accessorKey: "birthDate",
        header: t("birthDate"),
        cell: ({ row }) => {
          return <span>{row.getValue("birthDate")}</span>;
        },
      },
      {
        accessorKey: "gender",
        header: t("gender"),
        cell: ({ row }) => {
          return <span>{enumsT(`Gender.${row.getValue("gender")}`)}</span>;
        },
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => {
          const statusColors: Record<number, string> = {
            1: "bg-success/20 text-success",
            2: "bg-destructive/20 text-destructive",
            3: "bg-default/20 text-default",
            4: "bg-warning/20 text-warning",
          };
          const status = row.getValue<number>("status");
          const statusStyles = statusColors[status] || "default";
          return (
            <Badge className={cn("rounded-full px-5", statusStyles)}>
              {enumsT(`ServiceRecipientStatus.${status}`)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: t("actions"),
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={ROUTES.ADMIN.SERVICE_RECIPIENTS.EDIT(
                        row.original.id
                      )}
                    >
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
                    <p>{actionsT("edit")}</p>
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
                    <p>{actionsT("delete")}</p>
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

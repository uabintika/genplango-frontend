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
import { User } from "./table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/badge";
import { UserRole } from "@/types/enum.types";
import { useUserRoleOptions } from "@/hooks/use-enum";

export default function useUserTableColumns(): ColumnDef<User>[] {
  const { map: userRoles } = useUserRoleOptions();

  return React.useMemo<ColumnDef<User>[]>(
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
        header: "Rolė",
        accessorKey: "roles",
        cell: ({ getValue }) => {
          const statusColors: Record<string, string> = {
            [UserRole.Administrator]: "bg-success/20 text-success",
            [UserRole.Coordinator]: "bg-default/20 text-default",
          };
          const role = getValue<Role[]>()[0];
          const colors = statusColors[role?.name];
          return (
            <Badge className={cn("rounded-full px-5", colors)}>
              {userRoles[role?.name] ?? "Nenurodyta"}
            </Badge>
          );
        },
      },
      {
        header: "Naudotojas",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-semibold">
              {row.original.firstName + " " + row.original.lastName}
            </span>
            <span className="font-semibold">{row.original.duty}</span>
          </div>
        ),
      },
      {
        header: "Kontaktai",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-semibold">{row.original.email}</span>
              <span className="font-semibold">
                {row.original.phoneNumber ?? ""}
              </span>
            </div>
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
                    <Link href={ROUTES.ADMIN.USERS.UPDATE(row.original.id)}>
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

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RESOURCES, usePermission } from "@/hooks/use-permission";
import { notFound } from "next/navigation";
import WorkersTable from "./_components/table";

export default function WorkersPage() {
  const { can } = usePermission();

  if (!can(RESOURCES.Workers, "viewAny")) {
    return notFound();
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <WorkersTable />
        </CardContent>
      </Card>
    </>
  );
}

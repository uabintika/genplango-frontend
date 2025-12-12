"use client";

import { Card, CardContent } from "@/components/ui/card";
import KinshipRelationsTable from "./_components/table";
import { RESOURCES, usePermission } from "@/hooks/use-permission";
import { notFound } from "next/navigation";

export default function KinshipRelationsPage() {
  const { can } = usePermission();

  if (!can(RESOURCES.KinshipRelations, "viewAny")) {
    return notFound();
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <KinshipRelationsTable />
        </CardContent>
      </Card>
    </>
  );
}

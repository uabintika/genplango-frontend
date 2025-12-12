"use client";

import { Card, CardContent } from "@/components/ui/card";
import MethodologyAreasTable from "./_components/table";
import { RESOURCES, usePermission } from "@/hooks/use-permission";
import { notFound } from "next/navigation";

export default function MethodologyAreasPage() {
  const { can } = usePermission();

  if (!can(RESOURCES.MethodologyAreas, "viewAny")) {
    return notFound();
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <MethodologyAreasTable />
        </CardContent>
      </Card>
    </>
  );
}

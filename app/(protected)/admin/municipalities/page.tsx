"use client";

import { Card, CardContent } from "@/components/ui/card";
import MunicipalitiesTable from "./_components/table";
import { RESOURCES, usePermission } from "@/hooks/use-permission";
import { notFound } from "next/navigation";

export default function MunicipalitiesPage() {
  const { can } = usePermission();

  if (!can(RESOURCES.Municipalities, "viewAny")) {
    return notFound();
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <MunicipalitiesTable />
        </CardContent>
      </Card>
    </>
  );
}

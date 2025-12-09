"use client";

import { Card, CardContent } from "@/components/ui/card";
import UsersTable from "./_components/table";
import { RESOURCES, usePermission } from "@/hooks/use-permission";
import { notFound } from "next/navigation";

export default function UsersPage() {
  const { can } = usePermission();

  if (!can(RESOURCES.Users, "viewAny")) {
    return notFound();
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <UsersTable />
        </CardContent>
      </Card>
    </>
  );
}

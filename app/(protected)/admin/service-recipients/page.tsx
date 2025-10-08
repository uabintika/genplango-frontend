"use client";

import { Card, CardContent } from "@/components/ui/card";
import ServiceRecipientsTable from "./_components/table";
import { RESOURCES, usePermission } from "@/hooks/use-permission";
import { notFound } from "next/navigation";

export default function ServiceRecipientsPage() {
  const { can } = usePermission();

  if (!can(RESOURCES.ServiceRecipients, "viewAny")) {
    return notFound();
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <ServiceRecipientsTable />
        </CardContent>
      </Card>
    </>
  );
}

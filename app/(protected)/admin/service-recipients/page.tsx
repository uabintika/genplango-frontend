"use client";

import { Card, CardContent } from "@/components/ui/card";
import ServiceRecipientsTable from "./_components/table";

export default function ServiceRecipientsPage() {
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

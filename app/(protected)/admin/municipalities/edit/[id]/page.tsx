"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MunicipalityForm from "../../create/_components/municipality-form";
import React from "react";

export default function EditMunicipalityPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center text-default-600 font-semibold text-xl">
        Redaguoti savivaldybę
      </CardHeader>
      <CardContent>
        <MunicipalityForm id={id} mode="Update" />
      </CardContent>
    </Card>
  );
}

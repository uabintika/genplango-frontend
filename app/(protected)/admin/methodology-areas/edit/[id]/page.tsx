"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MethodologyAreaForm from "../../create/_components/methodology-area-form";
import React from "react";

export default function EditMethodologyAreaPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center text-default-600 font-semibold text-xl">
        Redaguoti metodikos sritį
      </CardHeader>
      <CardContent>
        <MethodologyAreaForm id={id} mode="Update" />
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import KinshipRelationForm from "../../create/_components/kinship-relation-form";
import React from "react";

export default function EditKinshipRelationPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center text-default-600 font-semibold text-xl">
        Redaguoti ryšį
      </CardHeader>
      <CardContent>
        <KinshipRelationForm id={id} mode="Update" />
      </CardContent>
    </Card>
  );
}

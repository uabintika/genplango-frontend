"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import KinshipRelation from "./_components/kinship-relation-form";

export default function CreateKinshipRelationPage() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center text-default-600 font-semibold text-xl">
        Sukurti ryšį
      </CardHeader>
      <CardContent>
        <KinshipRelation mode="Create" />
      </CardContent>
    </Card>
  );
}

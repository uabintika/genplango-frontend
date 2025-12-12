"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MunicipalityForm from "./_components/municipality-form";

export default function CreateMunicipalityPage() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center text-default-600 font-semibold text-xl">
        Sukurti savivaldybę
      </CardHeader>
      <CardContent>
        <MunicipalityForm mode="Create" />
      </CardContent>
    </Card>
  );
}

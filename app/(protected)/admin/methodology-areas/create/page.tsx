"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MethodologyArea from "./_components/methodology-area-form";

export default function CreateMethodologyAreaPage() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center text-default-600 font-semibold text-xl">
        Sukurti metodikos sritį
      </CardHeader>
      <CardContent>
        <MethodologyArea mode="Create" />
      </CardContent>
    </Card>
  );
}

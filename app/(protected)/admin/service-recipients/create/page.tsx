import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralInfoForm from "./general-info-form";

export default function CreateServiceRecipientPage() {
  return (
    <Card className="max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Sukurti klientą</CardTitle>
      </CardHeader>
      <CardContent>
        <GeneralInfoForm />
      </CardContent>
    </Card>
  );
}

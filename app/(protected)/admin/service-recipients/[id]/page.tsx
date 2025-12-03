"use client";

import useGenericForm from "@/hooks/use-generic-form";
import {
  baseFormSchema,
  ServiceRecipientFormSchemaType,
} from "../create/schemas";
import { API_ROUTES } from "@/routes/api";
import * as React from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Contact, Hammer, Save, UserIcon } from "lucide-react";
import GeneralInfoForm from "../create/general-info-form";
import ContactInfoForm from "../create/contact-info-form";
import AssignablesForm from "../create/assignables-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function EditServiceRecipientPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  const { form, submitForm, isLoading } = useGenericForm<
    typeof baseFormSchema,
    ServiceRecipientFormSchemaType
  >({
    mode: "Update",
    schema: baseFormSchema,
    mutateUrl: API_ROUTES.SERVICE_RECIPIENTS.UPDATE(id),
    fetchModelUrl: API_ROUTES.SERVICE_RECIPIENTS.GET(id),
    useFormOptions: {
      defaultValues: baseFormSchema.parse({}),
      mode: "all",
    },
    onSuccess: () => {
      toast.success("Klientas atnaujintas sėkmingai!");
    },
  });

  return (
    <>
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-3">
          <Tabs defaultValue="generalInfo">
            <TabsList className="gap-3 bg-transparent gpg-tabslist">
              <TabsTrigger value="generalInfo">
                <UserIcon className="size-5" />{" "}
                <h1 className="text-xl">Pagrindinė informacija</h1>
              </TabsTrigger>
              <TabsTrigger value="contactInfo">
                <Contact className="size-5" />
                <h1 className="text-xl">Kontaktiniai asmenys</h1>
              </TabsTrigger>
              <TabsTrigger value="assignables">
                <Hammer className="size-5" />
                <h1 className="text-xl">Darbuotojai</h1>
              </TabsTrigger>
            </TabsList>
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitForm)}>
                <TabsContent value="generalInfo">
                  <GeneralInfoForm isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="contactInfo">
                  <ContactInfoForm isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="assignables">
                  <AssignablesForm isLoading={isLoading} />
                </TabsContent>
                <div className="flex justify-end my-5 mr-5">
                  <Button
                    color="success"
                    size="md"
                    className="space-x-2"
                    isLoading={isLoading}
                  >
                    <span>Išsaugoti</span> <Save size={18} />
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}

"use client";

import useGenericForm from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import * as React from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Contact, Hammer, Notebook, Save, UserIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GeneralInfoSection from "../../create/_components/general-info-section";
import AssignablesSection from "../../create/_components/assignables-section";
import ContactsSection from "./_components/contacts/contacts-section";
import NotesSection from "./_components/notes/notes-section";
import {
  editServiceRecipientSchema,
  EditServiceRecipientSchemaType,
} from "./schemas/base.schema";

export default function EditServiceRecipientPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  const { form, submitForm, isLoading } = useGenericForm<
    typeof editServiceRecipientSchema,
    EditServiceRecipientSchemaType
  >({
    mode: "Update",
    schema: editServiceRecipientSchema,
    mutateUrl: API_ROUTES.SERVICE_RECIPIENTS.UPDATE(id),
    fetchModelUrl: API_ROUTES.SERVICE_RECIPIENTS.GET(id),
    useFormOptions: {
      defaultValues: editServiceRecipientSchema.parse({}),
    },
    onSuccess: () => {
      toast.success("Klientas atnaujintas sėkmingai!");
    },
  });

  const [tab, setTab] = React.useState("generalInfo");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const showSaveButton = ["generalInfo", "assignables"].includes(tab);

  return (
    <>
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-3">
          <Tabs defaultValue="generalInfo" onValueChange={onTabChange}>
            <TabsList className="gap-3 bg-transparent gpg-tabslist">
              <TabsTrigger value="generalInfo">
                <UserIcon className="size-5" />
                <h1 className="text-xl">Pagrindinė informacija</h1>
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Contact className="size-5" />
                <h1 className="text-xl">Kontaktiniai asmenys</h1>
              </TabsTrigger>
              <TabsTrigger value="assignables">
                <Hammer className="size-5" />
                <h1 className="text-xl">Darbuotojai</h1>
              </TabsTrigger>
              <TabsTrigger value="notes">
                <Notebook className="size-5" />
                <h1 className="text-xl">Užrašai</h1>
              </TabsTrigger>
            </TabsList>
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitForm)}>
                <TabsContent value="generalInfo">
                  <GeneralInfoSection isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="assignables">
                  <AssignablesSection isLoading={isLoading} />
                </TabsContent>
                <div
                  hidden={!showSaveButton}
                  className="flex justify-end my-5 mr-5"
                >
                  <Button
                    color="primary"
                    size="md"
                    className="space-x-2"
                    isLoading={isLoading}
                  >
                    <span>Išsaugoti klientą</span> <Save size={18} />
                  </Button>
                </div>
              </form>
            </Form>
            <TabsContent value="contacts">
              <ContactsSection isLoading={isLoading} serviceRecipientId={id} />
            </TabsContent>
            <TabsContent value="notes">
              <NotesSection isLoading={isLoading} serviceRecipientId={id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}

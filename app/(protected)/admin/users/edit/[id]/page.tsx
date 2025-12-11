"use client";

import useGenericForm from "@/hooks/use-generic-form";
import * as React from "react";
import { editUserSchema, EditUserSchemaType } from "./schemas/base.schema";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contact, Save, UserIcon, UsersRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import GeneralInfoSection from "../../create/_components/general-info-section";
import { Button } from "@/components/ui/button";
import LoginInfoSection from "../../create/_components/login-info-section";
import { UserRole } from "@/types/enum.types";
import AssignablesFormSection from "./_components/assignables-form-section";

export default function EditWorkerPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  const { form, submitForm, isLoading, fetchedModel, mutateFetchedModel } =
    useGenericForm<typeof editUserSchema, EditUserSchemaType>({
      mode: "Update",
      schema: editUserSchema,
      mutateUrl: API_ROUTES.USERS.UPDATE(id),
      fetchModelUrl: API_ROUTES.USERS.GET(id),
      onSuccess: () => {
        toast.success("Naudotojas atnaujintas sėkmingai!");
      },
    });

  const displayAssignables = fetchedModel?.role === UserRole.Coordinator;

  const [tab, setTab] = React.useState("generalInfo");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const showSaveButton = ["generalInfo", "loginData"].includes(tab);

  return (
    <>
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-3">
          <Tabs defaultValue={tab} onValueChange={onTabChange}>
            <TabsList className="gap-3 bg-transparent gpg-tabslist">
              <TabsTrigger value="generalInfo">
                <UserIcon className="size-5" />
                <h1 className="text-xl">Pagrindinė informacija</h1>
              </TabsTrigger>
              <TabsTrigger value="loginData">
                <Contact className="size-5" />
                <h1 className="text-xl">Prisijungimo informacija</h1>
              </TabsTrigger>
              {displayAssignables && (
                <TabsTrigger value="assignables">
                  <UsersRound className="size-5" />
                  <h1 className="text-xl">Prieiga</h1>
                </TabsTrigger>
              )}
            </TabsList>
            <Separator />
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form
                    .handleSubmit(submitForm)()
                    .then(() => {
                      mutateFetchedModel(form.getValues(), false);
                    });
                }}
              >
                <TabsContent value="generalInfo">
                  <GeneralInfoSection isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="loginData">
                  <LoginInfoSection
                    form={form}
                    isLoading={isLoading}
                    formNamePrefix="loginData"
                  />
                </TabsContent>
                <div
                  className="flex justify-end my-5 mr-5"
                  hidden={!showSaveButton}
                >
                  <Button
                    color="primary"
                    size="md"
                    className="space-x-2"
                    isLoading={isLoading}
                  >
                    <span>Išsaugoti naudotoją</span> <Save size={18} />
                  </Button>
                </div>
              </form>
            </Form>
            {displayAssignables && (
              <TabsContent value="assignables">
                <AssignablesFormSection userId={id} isLoading={isLoading} />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}

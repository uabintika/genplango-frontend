"use client";

import useGenericForm from "@/hooks/use-generic-form";
import * as React from "react";
import { editWorkerSchema, EditWorkerSchemaType } from "./schemas/base.schema";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contact, Save, UserIcon, UsersRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import GeneralInfoSection from "../../create/_components/general-info-section";
import AssignablesSection from "../../create/_components/assignables-section";
import { Button } from "@/components/ui/button";
import LoginInfoSection from "../../create/_components/login-info-section";

export default function EditWorkerPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  const { form, submitForm, isLoading } = useGenericForm<
    typeof editWorkerSchema,
    EditWorkerSchemaType
  >({
    mode: "Update",
    schema: editWorkerSchema,
    mutateUrl: API_ROUTES.WORKERS.UPDATE(id),
    fetchModelUrl: API_ROUTES.WORKERS.GET(id),
    useFormOptions: {
      defaultValues: editWorkerSchema.parse({}),
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
                <UserIcon className="size-5" />
                <h1 className="text-xl">Pagrindinė informacija</h1>
              </TabsTrigger>
              <TabsTrigger value="loginData">
                <Contact className="size-5" />
                <h1 className="text-xl">Prisijungimo informacija</h1>
              </TabsTrigger>
              <TabsTrigger value="assignables">
                <UsersRound className="size-5" />
                <h1 className="text-xl">Priskyrimai</h1>
              </TabsTrigger>
            </TabsList>
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitForm)}>
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
                <TabsContent value="assignables">
                  <AssignablesSection isLoading={isLoading} />
                </TabsContent>
                <div className="flex justify-end my-5 mr-5">
                  <Button
                    color="primary"
                    size="md"
                    className="space-x-2"
                    isLoading={isLoading}
                  >
                    <span>Išsaugoti darbuotoją</span> <Save size={18} />
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

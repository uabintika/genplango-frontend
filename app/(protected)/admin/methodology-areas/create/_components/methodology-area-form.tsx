"use client";

import useGenericForm, { getModes } from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import Input from "@/components/ui/input";
import z from "zod";
import { zRequiredString } from "@/lib/base-schemas";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Mode } from "@/types/use-generic-form";

const methodologyAreaSchema = z.object({
  name: zRequiredString,
});

type MethodologyAreaSchemaType = z.infer<typeof methodologyAreaSchema>;

type MethodologyAreaFormProps = {
  id?: number;
  mode: Mode;
};

export default function MethodologyAreaForm({
  id,
  mode,
}: MethodologyAreaFormProps) {
  const navigate = useRouter();
  const modes = getModes(mode);

  const { form, submitForm, isLoading } = useGenericForm<
    typeof methodologyAreaSchema,
    MethodologyAreaSchemaType
  >({
    mode: mode,
    schema: methodologyAreaSchema,
    mutateUrl: modes.isCreate
      ? API_ROUTES.METHODOLOGY_AREAS.CREATE
      : API_ROUTES.METHODOLOGY_AREAS.UPDATE(id as number),
    fetchModelUrl: modes.isUpdate
      ? API_ROUTES.METHODOLOGY_AREAS.GET(id as number)
      : undefined,
    useFormOptions: {
      mode: "all",
    },
    onSuccess: () => {
      toast.success(
        `Metodikos sritis ${
          modes.isCreate ? "sukurta" : "atnaujinta"
        } sėkmingai!`
      );

      if (modes.isCreate) {
        navigate.push(ROUTES.ADMIN.METHODOLOGY_AREAS.INDEX);
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <FormFieldWrapper
          control={form.control}
          formField={{
            name: "name",
            label: "Pavadinimas",
            render: ({ field }) => (
              <Input
                {...field}
                placeholder="Pavadinimas"
                disabled={isLoading}
              />
            ),
          }}
        />
        <div className="flex justify-end p-5">
          <Button color="primary" isLoading={isLoading} size="md">
            Sukurti
            <Plus size={18} />
          </Button>
        </div>
      </form>
    </Form>
  );
}

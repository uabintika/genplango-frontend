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

const municipalitySchema = z.object({
  name: zRequiredString,
});

type MunicipalitySchemaType = z.infer<typeof municipalitySchema>;

type MunicipalityFormProps = {
  id?: number;
  mode: Mode;
};

export default function MunicipalityForm({ id, mode }: MunicipalityFormProps) {
  const navigate = useRouter();
  const modes = getModes(mode);

  const { form, submitForm, isLoading } = useGenericForm<
    typeof municipalitySchema,
    MunicipalitySchemaType
  >({
    mode: mode,
    schema: municipalitySchema,
    mutateUrl: modes.isCreate
      ? API_ROUTES.MUNICIPALITIES.CREATE
      : API_ROUTES.MUNICIPALITIES.UPDATE(id as number),
    fetchModelUrl: modes.isUpdate
      ? API_ROUTES.MUNICIPALITIES.GET(id as number)
      : undefined,
    useFormOptions: {
      mode: "all",
    },
    onSuccess: () => {
      toast.success(
        `Savivaldybė ${modes.isCreate ? "sukurta" : "atnaujinta"} sėkmingai!`
      );

      if (modes.isCreate) {
        navigate.push(ROUTES.ADMIN.MUNICIPALITIES.INDEX);
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

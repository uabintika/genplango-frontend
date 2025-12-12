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

const kinshipRelationSchema = z.object({
  name: zRequiredString,
});

type KinshipRelationSchemaType = z.infer<typeof kinshipRelationSchema>;

type KinshipRelationFormProps = {
  id?: number;
  mode: Mode;
};

export default function KinshipRelationForm({
  id,
  mode,
}: KinshipRelationFormProps) {
  const navigate = useRouter();
  const modes = getModes(mode);

  const { form, submitForm, isLoading } = useGenericForm<
    typeof kinshipRelationSchema,
    KinshipRelationSchemaType
  >({
    mode: mode,
    schema: kinshipRelationSchema,
    mutateUrl: modes.isCreate
      ? API_ROUTES.KINSHIP_RELATIONS.CREATE
      : API_ROUTES.KINSHIP_RELATIONS.UPDATE(id as number),
    fetchModelUrl: modes.isUpdate
      ? API_ROUTES.KINSHIP_RELATIONS.GET(id as number)
      : undefined,
    useFormOptions: {
      mode: "all",
    },
    onSuccess: () => {
      toast.success(
        `Ryšys ${modes.isCreate ? "sukurtas" : "atnaujintas"} sėkmingai!`
      );

      if (modes.isCreate) {
        navigate.push(ROUTES.ADMIN.KINSHIP_RELATIONS.INDEX);
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

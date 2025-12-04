"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  contactSchema,
  ContactSchemaType,
} from "../../../create/schemas/contacts.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ContactFormItem from "../../../create/_components/contact-form-item";
import { Contact } from "../schemas/contacts.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: Contact | null;
  onSave: (data: ContactSchemaType) => void;
  isLoading: boolean;
};

export default function ContactModal({
  isOpen,
  onClose,
  initialData,
  onSave,
  isLoading,
}: ContactModalProps) {
  const defaultValues = contactSchema.parse({});
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
    values: initialData ?? defaultValues,
    mode: "all",
  });

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset(initialData);
      } else {
        form.reset({});
      }
    }
  }, [isOpen, initialData]);

  const onSubmit = (data: ContactSchemaType) => {
    const payload = initialData ? { ...data, id: initialData.id } : data;
    onSave(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Redaguoti kontaktą" : "Pridėti kontaktą"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ContactFormItem form={form} isLoading={isLoading} />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Atšaukti
            </Button>
            <Button
              type="button"
              isLoading={isLoading}
              onClick={async () => {
                const res = await form.trigger();
                if (res) {
                  onSubmit(contactSchema.parse(form.getValues()));
                }
              }}
            >
              {initialData ? "Atnaujinti" : "Pridėti"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

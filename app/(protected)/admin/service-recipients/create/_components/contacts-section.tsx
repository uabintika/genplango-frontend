"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, UserMinus2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ContactFormItem from "./contact-item";
import { contactsSchema } from "../schemas/contacts.schema";
import { CreateServiceRecipientFormSchemaType } from "../schemas/base.schema";

export default function ContactsSection({
  isLoading,
}: {
  isLoading?: boolean;
}) {
  const form = useFormContext<CreateServiceRecipientFormSchemaType>();
  const contacts = form.watch("contacts") ?? [];

  const addContact = () => {
    form.setValue("contacts", [...contacts, contactsSchema.parse({})]);
  };

  const removeContact = (index: number) => {
    form.setValue(
      "contacts",
      contacts.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col">
      {contacts.map((_, index) => (
        <div key={index}>
          <Button
            size="sm"
            color="destructive"
            onClick={() => removeContact(index)}
            isLoading={isLoading}
            className="mb-2"
          >
            Šalinti
            <UserMinus2Icon size="18" className="ml-2" />
          </Button>

          <ContactFormItem index={index} isLoading={isLoading} />

          {index < contacts.length - 1 && <Separator className="my-4" />}
        </div>
      ))}

      <Button
        onClick={addContact}
        variant="shadow"
        size="sm"
        isLoading={isLoading}
        className="mx-auto"
      >
        Pridėti kontaktą <Plus size="18" />
      </Button>
    </div>
  );
}

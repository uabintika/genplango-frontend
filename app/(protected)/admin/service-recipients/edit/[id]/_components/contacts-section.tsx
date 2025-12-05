"use client";

import { Button } from "@/components/ui/button";
import { Edit, Plus, Star, UserMinus2Icon } from "lucide-react";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import { Contact, ListContact } from "../schemas/contacts.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import ContactModal from "./contact-modal";
import api from "@/lib/axios";
import { ContactSchemaType } from "../../../create/schemas/contacts.schema";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/ui/loader";

type ContactsSectionProps = {
  isLoading?: boolean;
  serviceRecipientId: number;
};

export default function ContactsSection({
  isLoading,
  serviceRecipientId,
}: ContactsSectionProps) {
  const {
    data: contacts,
    mutate,
    isLoading: loadingContacts,
  } = useSWR<ListContact[]>(
    API_ROUTES.SERVICE_RECIPIENTS.CONTACTS.INDEX(serviceRecipientId)
  );

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedContact, setSelectedContact] =
    React.useState<ListContact | null>(null);
  const [isMutating, setIsMutating] = React.useState(false);

  const handleOpenAdd = () => {
    setSelectedContact(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (contact: ListContact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleModalClose = () => {
    setIsDialogOpen(false);
    setSelectedContact(null);
  };

  const handleSaveContact = async (formData: ContactSchemaType) => {
    setIsMutating(true);
    try {
      if (selectedContact) {
        const url = API_ROUTES.SERVICE_RECIPIENTS.CONTACTS.UPDATE(
          serviceRecipientId,
          selectedContact.id
        );

        const res = await api.put(url, formData);

        if (res) {
          const optimisticData = contacts?.map((c) =>
            c.id === selectedContact.id ? { ...c, ...formData } : c
          );

          await mutate(optimisticData, false);
        }
      } else {
        const url =
          API_ROUTES.SERVICE_RECIPIENTS.CONTACTS.CREATE(serviceRecipientId);

        const { data: newContact } = await api.post<ListContact>(url, formData);

        mutate([...(contacts || []), newContact]);
      }

      handleModalClose();
    } catch (error) {
      console.error("Failed to save contact", error);
      toast.error("Klaida saugant kontaktą");
    } finally {
      setIsMutating(false);
    }
  };

  const removeContact = async (id: number) => {
    setIsMutating(true);
    try {
      const response = await api.delete(
        API_ROUTES.SERVICE_RECIPIENTS.CONTACTS.DELETE(serviceRecipientId, id)
      );

      if (response.status === 200) {
        const filtered = contacts?.filter((contact) => contact.id !== id);
        await mutate(filtered, false);
      }
    } catch (error) {
      console.error("Failed to delete contact", error);
      mutate(); // Revert changes on error
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="my-3 mx-5 ml-auto">
        <Button
          onClick={handleOpenAdd}
          variant="shadow"
          size="md"
          isLoading={isLoading || loadingContacts || isMutating}
          type="button"
        >
          Pridėti kontaktą <Plus size="18" className="ml-2" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {contacts?.map((contact) => (
          <Card key={contact.id} className="transition-all hover:scale-[1.02]">
            <CardHeader className="py-5 flex flex-row justify-between">
              <div className="text-lg font-semibold m-0">
                {contact.firstName + " " + contact.lastName}
              </div>
              {contact.isDefault && (
                <Star className="text-yellow-500 fill-yellow-500" />
              )}
            </CardHeader>
            <Separator />
            <CardContent className="py-5">
              <div className="text-muted-foreground">
                Telefono nr:{" "}
                <span className="font-semibold">{contact.phoneNumber}</span>
              </div>
              <div className="text-muted-foreground">
                Ryšys su klientu:{" "}
                <span className="font-semibold">
                  {contact.kinshipRelation.name}
                </span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-row gap-2 justify-end py-5 space-y-0">
              <Button
                size="sm"
                color="destructive"
                onClick={() => removeContact(contact.id)}
                isLoading={isLoading || isMutating}
                type="button"
                className="active:scale-[0.95]"
              >
                Šalinti
                <UserMinus2Icon size="18" className="ml-2" />
              </Button>
              <Button
                size="sm"
                color="warning"
                isLoading={isLoading || isMutating}
                onClick={() => handleOpenEdit(contact)}
                type="button"
                className="active:scale-[0.95]"
              >
                Redaguoti
                <Edit size="18" className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {(contacts?.length === 0 || loadingContacts) && (
        <div className="p-10">
          {loadingContacts ? (
            <Loader className="mx-auto size-10" />
          ) : (
            <h1 className="text-center text-2xl font-semibold text-accent-foreground">
              Klientas neturi kontaktų
            </h1>
          )}
        </div>
      )}

      <ContactModal
        isOpen={isDialogOpen}
        onClose={handleModalClose}
        initialData={selectedContact}
        onSave={handleSaveContact}
        isLoading={isMutating}
      />
    </div>
  );
}

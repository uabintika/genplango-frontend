"use client";

import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/routes/api";
import * as React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import api from "@/lib/axios";
import { NoteSchemaType } from "../schemas/notes.schema";
import { Plus } from "lucide-react";

type Note = {
  id: number;
  description: string;
};

type NotesSectionProps = {
  isLoading?: boolean;
  serviceRecipientId: number;
};

export default function NotesSection({
  isLoading,
  serviceRecipientId,
}: NotesSectionProps) {
  const {
    data: notes,
    mutate,
    isLoading: loadingContacts,
  } = useSWR<Note[]>(
    API_ROUTES.SERVICE_RECIPIENTS.CONTACTS.INDEX(serviceRecipientId)
  );

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedContact, setSelectedNote] = React.useState<Note | null>(null);
  const [isMutating, setIsMutating] = React.useState(false);

  const handleOpenAdd = () => {
    setSelectedNote(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setSelectedNote(note);
    setIsDialogOpen(true);
  };

  const handleModalClose = () => {
    setIsDialogOpen(false);
    setSelectedNote(null);
  };

  const handleSaveNote = async (formData: NoteSchemaType) => {
    setIsMutating(true);
    try {
      if (selectedContact) {
        const url = API_ROUTES.SERVICE_RECIPIENTS.NOTES.UPDATE(
          serviceRecipientId,
          selectedContact.id
        );

        const res = await api.put(url, formData);

        if (res) {
          const optimisticData = notes?.map((c) =>
            c.id === selectedContact.id ? { ...c, ...formData } : c
          );

          await mutate(optimisticData, false);
        }
      } else {
        const url =
          API_ROUTES.SERVICE_RECIPIENTS.NOTES.CREATE(serviceRecipientId);

        const { data: newNote } = await api.post<Note>(url, formData);

        mutate([...(notes || []), newNote]);
      }

      handleModalClose();
    } catch (error) {
      console.error("Failed to save contact", error);
      toast.error("Klaida saugant kontaktą");
    } finally {
      setIsMutating(false);
    }
  };

  const removeNote = async (id: number) => {
    setIsMutating(true);
    try {
      const response = await api.delete(
        API_ROUTES.SERVICE_RECIPIENTS.CONTACTS.DELETE(
          serviceRecipientId,
          Number(id)
        )
      );

      if (response.status === 200) {
        const filtered = notes?.filter((note) => note.id !== id);
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
          Pridėti užrašą <Plus size="18" className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

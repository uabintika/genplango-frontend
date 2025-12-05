"use client";

import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/routes/api";
import * as React from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { ListNote, NoteSchemaType } from "../../schemas/notes.schema";
import { Plus } from "lucide-react";
import { useModalController } from "@/hooks/use-modal-controller";
import NoteModal from "./note-modal";
import NotesTable, { NotesTableRef } from "./table";

type NotesSectionProps = {
  isLoading?: boolean;
  serviceRecipientId: number;
};

export default function NotesSection({
  isLoading,
  serviceRecipientId,
}: NotesSectionProps) {
  const notesTableRef = React.useRef<NotesTableRef>(null);

  const {
    isDialogOpen,
    selectedItem: selectedNote,
    isMutating,
    setIsMutating,
    handleOpenAdd,
    handleOpenEdit,
    handleModalClose,
  } = useModalController<ListNote>();

  const handleSaveNote = async (formData: NoteSchemaType) => {
    setIsMutating(true);
    try {
      let res = null;

      if (selectedNote) {
        const url = API_ROUTES.SERVICE_RECIPIENTS.NOTES.UPDATE(
          serviceRecipientId,
          selectedNote.id
        );

        res = await api.put<ListNote>(url, formData);
      } else {
        const url =
          API_ROUTES.SERVICE_RECIPIENTS.NOTES.CREATE(serviceRecipientId);

        res = await api.post<ListNote>(url, formData);
      }

      if (!!res.data) {
        await notesTableRef.current?.refresh();
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
        API_ROUTES.SERVICE_RECIPIENTS.NOTES.DELETE(serviceRecipientId, id)
      );

      if (response.status === 204) {
        await notesTableRef.current?.refresh();
      }
    } catch (error) {
      console.error("Failed to delete contact", error);
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
          isLoading={isLoading || isMutating}
          type="button"
        >
          Pridėti užrašą <Plus size="18" className="ml-2" />
        </Button>
      </div>
      <div>
        <NotesTable
          ref={notesTableRef}
          serviceRecipientId={serviceRecipientId}
          handleNoteRemove={removeNote}
          handleOpenEditNoteModal={handleOpenEdit}
        />
      </div>
      <NoteModal
        isOpen={isDialogOpen}
        onClose={handleModalClose}
        initialData={selectedNote}
        onSave={handleSaveNote}
        isLoading={isMutating}
      />
    </div>
  );
}

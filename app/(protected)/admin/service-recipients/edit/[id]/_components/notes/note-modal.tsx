"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  ListNote,
  noteSchema,
  NoteSchemaType,
} from "../../schemas/notes.schema";
import NoteFormItem from "./note-form-item";

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: ListNote | null;
  onSave: (data: NoteSchemaType) => void;
  isLoading: boolean;
};

export default function NoteModal({
  isOpen,
  onClose,
  initialData,
  onSave,
  isLoading,
}: NoteModalProps) {
  const defaultValues = noteSchema.parse({});
  const form = useForm({
    resolver: zodResolver(noteSchema),
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

  const onSubmit = (data: NoteSchemaType) => {
    const payload = initialData ? { ...data, id: initialData.id } : data;
    onSave(payload);
  };

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="sm:max-w-[625px]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Redaguoti užrašą" : "Pridėti užrašą"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <NoteFormItem form={form} isLoading={isLoading} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Atšaukti
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                onClick={async () => await form.handleSubmit(onSubmit)()}
              >
                {initialData ? "Atnaujinti" : "Pridėti"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

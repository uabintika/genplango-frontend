import * as React from "react";

interface ModalControllerReturn<TResource> {
  isDialogOpen: boolean;
  selectedItem: TResource | null;
  isMutating: boolean;

  handleOpenAdd: () => void;
  handleOpenEdit: (item: TResource) => void;
  handleModalClose: () => void;

  setIsMutating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useModalController = <
  TResource
>(): ModalControllerReturn<TResource> => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<TResource | null>(
    null
  );
  const [isMutating, setIsMutating] = React.useState(false);

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: TResource) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleModalClose = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  return {
    isDialogOpen,
    selectedItem,
    isMutating,
    handleOpenAdd,
    handleOpenEdit,
    handleModalClose,
    setIsMutating,
  };
};

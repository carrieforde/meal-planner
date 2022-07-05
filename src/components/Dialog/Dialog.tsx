import { DialogType } from "@constants";
import { Dialog as MuiDialog } from "@mui/material";
import { ReactNode } from "react";
import { resetDialog, useDialogState } from "store";
import { AddCatalogItemForm, AddShoppingItemForm } from "views";

export const dialogContent: Record<DialogType, () => ReactNode> = {
  [DialogType.ADD_CATALOG_ITEM]: () => <AddCatalogItemForm />,
  [DialogType.ADD_LIST_ITEM]: () => <AddShoppingItemForm />,
};

export const Dialog = () => {
  const { isDialogOpen, type } = useDialogState();

  if (!type) {
    return null;
  }

  return (
    <MuiDialog data-testid="dialog" open={isDialogOpen} onClose={resetDialog}>
      {dialogContent[type]()}
    </MuiDialog>
  );
};

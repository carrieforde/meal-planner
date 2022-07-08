import { DialogType } from "@constants";
import { Dialog as MuiDialog } from "@mui/material";
import { AddCatalogItemForm } from "components/AddCatalogItemForm";
import { AddShoppingItemForm } from "components/AddShoppingItemForm";
import { ReactNode } from "react";
import { resetDialog, useDialogState } from "store";

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

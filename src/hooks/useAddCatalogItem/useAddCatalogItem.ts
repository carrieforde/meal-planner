import {
  CatalogInputItem,
  GetCatalogDocument,
  useAddCatalogItemMutation,
} from "generated/graphql";
import { useCallback } from "react";
import {
  resetDialog,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "store";

export const useAddCatalogItem = () => {
  const [mutation, { loading }] = useAddCatalogItemMutation();

  const addCatalogItem = useCallback(
    (input: CatalogInputItem) =>
      mutation({
        variables: { input },
        onCompleted(data) {
          setSnackbarMessage(data.addCatalogItem.message);
          setSnackbarSeverity(
            data.addCatalogItem.code === 200 ? "success" : "error"
          );
          setSnackbarOpen();
          resetDialog();
        },
        onError(error) {
          setSnackbarMessage(error.message);
          setSnackbarSeverity("error");
          setSnackbarOpen();
          resetDialog();
        },
        refetchQueries: [
          {
            query: GetCatalogDocument,
          },
        ],
      }),
    [mutation]
  );

  return {
    addCatalogItem,
    loading,
  };
};

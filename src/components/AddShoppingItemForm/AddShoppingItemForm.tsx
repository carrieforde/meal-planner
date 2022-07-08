import { LoadingButton } from "@mui/lab";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Form, Input, QueryHandler, UnitSelect } from "components";
import {
  AddItemToListMutationVariables,
  GetShoppingListDocument,
  useAddItemToListMutation,
  useGetCatalogQuery,
} from "generated/graphql";
import { isEmpty } from "lodash";
import { FormEvent, useState } from "react";
import {
  resetDialog,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "store";

const defaultAddShoppingItemFormValues: AddItemToListMutationVariables["input"] =
  {
    itemId: "",
    unit: "",
    quantityNeeded: 0,
  };

export const AddShoppingItemForm: React.FC = () => {
  const [values, setValues] = useState(defaultAddShoppingItemFormValues);

  const { data, error, loading } = useGetCatalogQuery();

  const [addShoppingListItem, { loading: addItemToListLoading }] =
    useAddItemToListMutation({
      variables: {
        input: {
          itemId: values.itemId,
          unit: !isEmpty(values.unit) ? values.unit : null,
          quantityNeeded: parseInt(values.quantityNeeded.toString()),
        },
      },
      onCompleted(response) {
        setSnackbarMessage(response.addItemToList?.message ?? "");
        setSnackbarSeverity(
          response.addItemToList?.code === 200 ? "success" : "error"
        );
        setSnackbarOpen();
        resetDialog();
      },
      refetchQueries: [
        {
          query: GetShoppingListDocument,
        },
      ],
    });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addShoppingListItem();
  };

  const handleChange = (event: any) => {
    setValues((s) => ({ ...s, [event.target.name]: event.target.value }));
  };

  return (
    <QueryHandler data={data} error={error} loading={loading}>
      <Form
        title="Add Item to List"
        onSubmit={handleSubmit}
        actions={
          <LoadingButton
            loading={addItemToListLoading}
            type="submit"
            variant="contained"
          >
            <Typography
              component="span"
              sx={{ marginLeft: addItemToListLoading ? "28px" : 0 }}
            >
              Add to List
            </Typography>
          </LoadingButton>
        }
      >
        {data?.catalog.length && (
          <Autocomplete
            disablePortal
            id="itemId"
            options={data.catalog}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Item" />}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) =>
              setValues((s) => ({ ...s, itemId: value?.id as string }))
            }
          />
        )}

        <Input
          variant="outlined"
          type="number"
          name="quantityNeeded"
          value={values.quantityNeeded}
          label="Quantity Needed"
          onChange={handleChange}
        />

        <UnitSelect value={values.unit as string} onChange={handleChange} />
      </Form>
    </QueryHandler>
  );
};

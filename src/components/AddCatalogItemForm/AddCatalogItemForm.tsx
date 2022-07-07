import { shoppingCategoriesMap } from "@constants";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { Form, Input, Select, UnitSelect } from "components";
import {
  AddCatalogItemMutationVariables,
  GetCatalogDocument,
  useAddCatalogItemMutation,
} from "generated/graphql";
import { isEmpty } from "lodash";
import React, { FormEvent, useState } from "react";
import {
  resetDialog,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "store";

const categoryOptions = Object.entries(shoppingCategoriesMap).map(
  ([value, label]) => ({ value, label })
);

const defaultAddCatalogItemFormValues: AddCatalogItemMutationVariables["input"] =
  {
    name: "",
    category: "",
    defaultUnit: "",
  };

export const AddCatalogItemForm: React.FC = () => {
  const [values, setValues] = useState(defaultAddCatalogItemFormValues);

  const [addCatalogItem, { loading }] = useAddCatalogItemMutation({
    variables: {
      input: {
        name: values.name,
        category: values.category,
        defaultUnit: !isEmpty(values.defaultUnit) ? values.defaultUnit : null,
      },
    },
    onCompleted: (data) => {
      setSnackbarMessage(data.addCatalogItem.message);
      setSnackbarSeverity(
        data.addCatalogItem.code === 200 ? "success" : "error"
      );
      setSnackbarOpen();
      resetDialog();
    },
    refetchQueries: [
      {
        query: GetCatalogDocument,
      },
    ],
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addCatalogItem();
  };

  const handleChange = (event: any) => {
    setValues((s) => ({ ...s, [event.target.name]: event.target.value }));
  };

  return (
    <Form
      title="Add Catalog Item"
      onSubmit={handleSubmit}
      actions={
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          type="submit"
          variant="contained"
        >
          <Typography
            component="span"
            sx={{ marginLeft: loading ? "28px" : 0 }}
          >
            Save
          </Typography>
        </LoadingButton>
      }
    >
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        label="Ingredient Name"
      />

      <UnitSelect
        label="Default Unit"
        name="defaultUnit"
        value={values.defaultUnit as string}
        onChange={handleChange}
      />

      <Select
        id="category"
        options={categoryOptions}
        name="category"
        value={values.category}
        onChange={handleChange}
        label="Category"
      />
    </Form>
  );
};

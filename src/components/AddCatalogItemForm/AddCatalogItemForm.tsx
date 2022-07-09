import { shoppingCategoriesMap } from "@constants";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { Form, Input, Select, UnitSelect } from "components";
import { AddCatalogItemMutationVariables } from "generated/graphql";
import { useAddCatalogItem } from "hooks";
import React, { FormEvent, useState } from "react";

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
  const { addCatalogItem, loading } = useAddCatalogItem();
  const [values, setValues] = useState(defaultAddCatalogItemFormValues);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addCatalogItem({
      name: values.name,
      category: values.category,
      defaultUnit: values.defaultUnit || null,
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues((s) => ({ ...s, [name]: value }));
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
        label="Item Name"
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

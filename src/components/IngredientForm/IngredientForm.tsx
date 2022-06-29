import { Button } from "@mui/material";
import { FormEvent, useState } from "react";
import { NoUnit, shoppingCategoriesMap, UnitMap } from "@constants";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { Select } from "components/Select";

interface IngredientFormValues {
  name: string;
  defaultUnit: keyof typeof UnitMap; // to be updated to use Unit enum.
  category: string; // should also be an enum
}

const defaultIngredientFormValues: IngredientFormValues = {
  name: "",
  defaultUnit: NoUnit.BLANK,
  category: "",
};

export const IngredientForm: React.FC = () => {
  const [values, setValues] = useState(defaultIngredientFormValues);

  const defaultUnitOptions = Object.entries(UnitMap).map(([value, label]) => ({
    value,
    label,
  }));

  const categoryOptions = Object.entries(shoppingCategoriesMap).map(
    ([value, label]) => ({ value, label })
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(values);
  };

  const handleChange = (event: any) => {
    setValues((s) => ({ ...s, [event.target.name]: event.target.value }));
  };

  return (
    <Form
      title="Add Ingredient"
      onSubmit={handleSubmit}
      actions={<Button type="submit">Save</Button>}
    >
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        label="Ingredient Name"
      />

      <Select
        label="Default Unit"
        id="defaultUnit"
        name="defaultUnit"
        value={values.defaultUnit}
        onChange={handleChange}
        options={defaultUnitOptions}
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

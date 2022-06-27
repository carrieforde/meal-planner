import { Button } from "@mui/material";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { ChangeEvent, FormEvent, useState } from "react";

interface IngredientFormValues {
  name: string;
  defaultUnit: string; // to be updated to use Unit enum.
  category: string; // should also be an enum
}

const defaultIngredientFormValues: IngredientFormValues = {
  name: "",
  defaultUnit: "",
  category: "",
};

export const IngredientForm: React.FC = () => {
  const [values, setValues] = useState(defaultIngredientFormValues);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(values);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

      <Input
        name="defaultUnit"
        value={values.defaultUnit}
        onChange={handleChange}
        label="Default Unit"
      />

      <Input
        name="category"
        value={values.category}
        onChange={handleChange}
        label="Category"
      />
    </Form>
  );
};

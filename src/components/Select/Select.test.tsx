import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

const onChange = jest.fn();

function renderSelect() {
  render(
    <Select
      label="Unit"
      id="unit"
      name="unit"
      value=""
      onChange={onChange}
      options={[
        {
          value: "POUND",
          label: "lbs",
        },
        {
          value: "GRAM",
          label: "g",
        },
      ]}
    />
  );
}

describe("Select", () => {
  it("should render the unit dropdown", () => {
    renderSelect();
    expect(screen.getByLabelText("Unit", { exact: false })).toBeInTheDocument();
  });
});

import { UnitMap } from "@constants";
import { SelectChangeEvent } from "@mui/material";
import { Select } from "components/Select";
import React from "react";

const defaultUnitOptions = Object.entries(UnitMap).map(([value, label]) => ({
  value,
  label,
}));

type UnitSelectProps = {
  label?: string;
  name?: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
};

export const UnitSelect: React.FC<UnitSelectProps> = ({
  label = "Unit",
  name = "unit",
  value,
  onChange,
}) => (
  <Select
    label={label}
    id={name}
    name={name}
    value={value}
    onChange={onChange}
    options={defaultUnitOptions}
  />
);

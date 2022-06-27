import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";

export type SelectProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: {
    value: string;
    label: string;
  }[];
};

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth>
    <InputLabel id={`${id}Label`}>{label}</InputLabel>
    <MuiSelect
      labelId={`${id}Label`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
    >
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

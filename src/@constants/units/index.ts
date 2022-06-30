export enum WeightUnits {
  GRAM = "GRAM",
  KILOGRAM = "KG",
  POUND = "POUND",
  MILLIGRAM = "MG",
  OUNCE = "OZ",
}

export enum VolumeUnits {
  CUP = "CUP",
  TEASPOON = "TEASPOON",
  TABLESPOON = "TABLESPOON",
  DROP = "DROP",
  GALLON = "GALLON",
}

export enum NoUnit {
  BLANK = "BLANK",
}

export type Units = WeightUnits | VolumeUnits | NoUnit;

export const UnitMap: Record<Units, string> = {
  [NoUnit.BLANK]: "-- No Unit --",
  [VolumeUnits.CUP]: "cup",
  [VolumeUnits.DROP]: "drop",
  [WeightUnits.GRAM]: "g",
  [WeightUnits.KILOGRAM]: "kg",
  [WeightUnits.POUND]: "lb",
  [WeightUnits.MILLIGRAM]: "mg",
  [WeightUnits.OUNCE]: "oz",
  [VolumeUnits.TEASPOON]: "teaspoon",
  [VolumeUnits.TABLESPOON]: "tablespoon",
  [VolumeUnits.GALLON]: "gallon",
};

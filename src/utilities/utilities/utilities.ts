import { UnitMap, Units } from "@constants";

export function pluralizeString(
  count: number,
  unit: string,
  isZeroPlural?: boolean
) {
  if (count > 0) {
    return count > 1 ? `${unit}s` : unit;
  }

  if (isZeroPlural) {
    return `${unit}s`;
  }

  return unit;
}

export function getMappedUnit(unit?: Units) {
  return unit ? UnitMap[unit] : "";
}

export function getText({
  quantityNeeded,
  itemName,
  unit,
}: {
  quantityNeeded: number;
  itemName: string;
  unit?: string | null;
}) {
  return [
    quantityNeeded,
    unit
      ? pluralizeString(quantityNeeded, getMappedUnit(unit as Units))
      : getMappedUnit(unit as Units),
    !unit ? pluralizeString(quantityNeeded, itemName) : itemName,
  ]
    .filter((element) => element)
    .join(" ");
}

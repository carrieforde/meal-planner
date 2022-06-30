import { UnitMap, VolumeUnits } from "@constants";
import { getMappedUnit, getText, pluralizeString } from "./utilities";

describe("utilities", () => {
  describe("pluralizeString", () => {
    it("should return a non-plural string when the coutn is equal to 1", () => {
      expect(pluralizeString(1, "carrot")).toEqual("carrot");
    });

    it("should return a pluralized string when the count is 2", () => {
      expect(pluralizeString(2, "carrot")).toEqual("carrots");
    });

    it("should return a pluralized string when the count is 0 and the isZeroPlural flag is passed", () => {
      expect(pluralizeString(0, "carrot", true)).toEqual("carrots");
    });

    it("should return a non-plural string when the count is 0 and the isZeroPlural flag is undefined", () => {
      expect(pluralizeString(0, "carrot")).toEqual("carrot");
    });
  });

  describe("getMappedUnits", () => {
    it("should return an empty string when the unit is undefined", () => {
      expect(getMappedUnit()).toEqual("");
    });

    it("should return a mapped unit", () => {
      expect(getMappedUnit(VolumeUnits.GALLON)).toEqual(
        UnitMap[VolumeUnits.GALLON]
      );
    });
  });

  describe("getText", () => {
    it("should return a string with quantity & item", () => {
      expect(getText({ quantityNeeded: 2, itemName: "carrot" })).toEqual(
        "2 carrots"
      );
    });

    it("should return a string with quantity, unit, and item", () => {
      expect(
        getText({
          quantityNeeded: 1,
          unit: VolumeUnits.GALLON,
          itemName: "milk",
        })
      ).toEqual("1 gallon milk");
    });
  });
});

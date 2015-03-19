var noBANValidator    = require("../lib/no_ban_validator"),
    isValid           = noBANValidator.isValid,
    calculateChecksum = noBANValidator.calculateChecksum;

describe("isValid", function () {
  it("should return false for undefined", function () {
    expect(isValid(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(isValid(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(isValid({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(isValid(0)).toBe(false);
  });

  it("should return false for strings less than 11 characters", function () {
    expect(isValid("4555213232")).toBe(false);
  });

  it("should return false for strings more than 11 characters", function () {
    expect(isValid("455521323210")).toBe(false);
  });

  it("should return false for strings containing more than just digits", function () {
    expect(isValid("455521a3232")).toBe(false);
  });

  it("should return false for a number where the checksum is wrong, but is otherwise correct", function () {
    spyOn(noBANValidator, "calculateChecksum").and.returnValue(false);

    expect(isValid("45552132321")).toBe(false);
  });

  it("should return true for a correct number", function () {
    spyOn(noBANValidator, "calculateChecksum").and.returnValue("0");

    expect(isValid("45552132320")).toBe(true);
  });
});

describe("calculateChecksum", function () {
  it("should return false for undefined", function () {
    expect(calculateChecksum(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(calculateChecksum(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(calculateChecksum({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(calculateChecksum(0)).toBe(false);
  });

  it("should return false for strings less than 10 characters", function () {
    expect(calculateChecksum("455521323")).toBe(false);
  });

  it("should return false for strings more than 10 characters", function () {
    expect(calculateChecksum("45552132321")).toBe(false);
  });

  it("should return 0 for 4555213232", function () {
    expect(calculateChecksum("4555213232")).toBe(0);
  });

  it("should return 1 for 4144523413", function () {
    expect(calculateChecksum("4144523413")).toBe(1);
  });

  it("should return 2 for 4542131224", function () {
    expect(calculateChecksum("4542131224")).toBe(2);
  });

  it("should return 3 for 4313443120", function () {
    expect(calculateChecksum("4313443120")).toBe(3);
  });

  it("should return 4 for 4143142412", function () {
    expect(calculateChecksum("4143142412")).toBe(4);
  });

  it("should return 5 for 4123534124", function () {
    expect(calculateChecksum("4123534124")).toBe(5);
  });

  it("should return 6 for 4523412312", function () {
    expect(calculateChecksum("4523412312")).toBe(6);
  });

  it("should return 7 for 4313224316", function () {
    expect(calculateChecksum("4313224316")).toBe(7);
  });

  it("should return 8 for 4123512324", function () {
    expect(calculateChecksum("4123512324")).toBe(8);
  });

  it("should return 9 for 4132434321", function () {
    expect(calculateChecksum("4132434321")).toBe(9);
  });

  // Using the formula would yield 10, but 10 is not allowed as a checksum.
  it("should return false for 1110000000", function () {
    expect(calculateChecksum("1110000000")).toBe(false);
  });
});

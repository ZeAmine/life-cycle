// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";

test("numberToRoman should convert integer to Roman numeral", () => {
  expect(numberToRoman(1)).toEqual("I");
  expect(numberToRoman(4)).toEqual("IV");
  expect(numberToRoman(9)).toEqual("IX");
  expect(numberToRoman(42)).toEqual("XLII");
  expect(numberToRoman(100)).toEqual("C");
  expect(numberToRoman(500)).toEqual("D");
  expect(numberToRoman(1000)).toEqual("M");
});

test("numberToRoman should return error message for non-integer or zero", () => {
  expect(numberToRoman(0)).toEqual("le format du chiffre n'est pas le bon");
  expect(numberToRoman(3.14)).toEqual("le format du chiffre n'est pas le bon");
});

test("numberToRoman should handle large numbers", () => {
  expect(numberToRoman(1987)).toEqual("MCMLXXXVII");
  expect(numberToRoman(3999)).toEqual("MMMCMXCIX");
});

test("numberToRoman should handle negative numbers", () => {
  expect(numberToRoman(-1)).toEqual("le format du chiffre n'est pas le bon");
});

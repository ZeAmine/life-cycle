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
  expect(numberToRoman(0)).toEqual("le nombre doit être un entier strictement positif et compris entre 1 et 3999");
  expect(numberToRoman(3.14)).toEqual("le nombre doit être un entier strictement positif et compris entre 1 et 3999");
});

test("numberToRoman should handle large numbers", () => {
  expect(numberToRoman(1987)).toEqual("MCMLXXXVII");
  expect(numberToRoman(3999)).toEqual("MMMCMXCIX");
});

test("numberToRoman should handle negative numbers", () => {
  expect(numberToRoman(-1)).toEqual("le nombre doit être un entier strictement positif et compris entre 1 et 3999");
});

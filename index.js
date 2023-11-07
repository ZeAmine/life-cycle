const numberToRoman = (number) => {
  const romanNumbers = {
    V: 5,
    IV: 4,
    I: 1,
  };

  let roman = "";

  for (let i in romanNumbers) {
    while (number >= romanNumbers[i]) {
      roman += i;
      number -= romanNumbers[i];
    }
  }
  return roman;
};

console.log(numberToRoman(4));

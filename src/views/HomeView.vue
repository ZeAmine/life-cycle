<template>
  <main class="main">
    <div class="home">
      <div class="block">
        <!-- <label for="arabicNbr">Choissez un chiffre (1 à 3999)</label>
        <input type="number" id="arabicNbr" v-model="arabicNbr" required />
        <p>{{ romanNbr }}</p> -->

        <label for="romanNbr">Choissez un chiffre (1 à 3999)</label>
        <input type="text" id="romanNbr" v-model="romanNbr" required />
        <p>{{ arabicNbr }}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";

const arabicNbr = ref<number>(1);
const romanNbr = ref<number>("V");

function numberToRoman(number: number): string {
  if (number % 1 !== 0 || number <= 0 || number >= 4000) {
    throw new Error("le nombre doit être un entier strictement positif et compris entre 1 et 3999");
  }

  const romanNumbers = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
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

  return (romanNbr.value = roman);
}

function romanToNumber(roman: string): number {
  const romanNumbers = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let number = 0;

  for (let i = 0; i < roman.length; i++) {
    const current = romanNumbers[roman[i]];
    const next = romanNumbers[roman[i + 1]];

    if (next && current < next) {
      number -= current;
    } else {
      number += current;
    }
  }

  return (arabicNbr.value = number);
}

watchEffect(() => {
  if (arabicNbr.value) {
    numberToRoman(arabicNbr.value);
  }

  if (romanNbr.value) {
    romanToNumber(romanNbr.value);
  }
});

onMounted(() => {
  numberToRoman(1);
  romanToNumber("V");
});
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
</style>

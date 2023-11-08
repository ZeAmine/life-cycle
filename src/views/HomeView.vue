<template>
  <main class="main">
    <h1>Hello</h1>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

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
    XCIX: 99,
    L: 50,
    XLIX: 49,
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
  return roman;
}

onMounted(() => {
  numberToRoman(5);
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

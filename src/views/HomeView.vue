<template>
  <main class="main">
    <div class="home">
      <div class="block">
        <!-- <label for="arabicNbr">Choissez un chiffre (1 à 3999)</label>
        <input type="number" id="arabicNbr" v-model="arabicNbr" required />
        <p>{{ romanNbr }}</p> -->

        <h1>Choisir un nombre romain</h1>
        <input v-model="roman" @input="convertRoman" placeholder="Enter Roman numeral" />
        <p v-if="result !== null" class="result">Result: {{ result }}</p>
      </div>
      <span class="info">* le chiffre doit être un entier strictement positif et compris entre 1 et 3999</span>
    </div>
  </main>
</template>

<!-- <script lang="ts" setup>
import { ref, watchEffect } from "vue";

let arabicNbr = ref<number>();
let romanNbr = ref<string>("");
let isValid = ref<boolean>(false);

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

function checkRomanValue() {
  const regex = /^(M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|)$/;

  if (regex.test(romanNbr.value)) {
    isValid.value = true;
  } else {
    isValid.value = false;
  }
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
  roman = roman.toUpperCase();

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
  romanToNumber(romanNbr.value);
});
</script> -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const roman = ref("");
const result = ref<number | null>(null);
const cacheKey = "romanCache";
let cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");

const convertRoman = async () => {
  const input = roman.value.toUpperCase();

  if (input in cache) {
    result.value = cache[input];
  } else {
    try {
      const response = await axios.post("https://life-cycle-api.onrender.com/convert", { roman: input });
      const convertedResult = response.data.result;
      cache[input] = convertedResult;
      result.value = convertedResult;
      localStorage.setItem(cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.error("Error converting Roman to Number:", error);
      result.value = null;
      cache[input] = null;
    }
  }
};

onMounted(() => {
  convertRoman();
});
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  .home {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    // justify-content: center;
    width: 100%;
    height: 100%;
    // pointer-events: none;

    .info {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      text-transform: uppercase;
    }

    .block {
      display: flex;
      flex-direction: column;
      width: 40rem;
      height: 30rem;
      margin: 0 auto;
      margin-top: 20rem;

      label {
        font-size: 1rem;
        text-transform: uppercase;
      }

      input {
        outline: none;
        border-radius: 0;
        border: 2px solid #d4d4d4;
        padding: 1rem 1.75rem;
        margin-top: 1rem;

        &:focus {
          border-color: #000;
        }
      }

      .result {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        margin-top: 4rem;

        p {
          font-family: "Playfair Display", serif;
          font-size: 7rem;
          text-transform: uppercase;
        }
        .error {
          color: red;
        }
      }
    }
  }
}
</style>

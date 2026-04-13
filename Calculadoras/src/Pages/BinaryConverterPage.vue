<script setup>
import { reactive, ref } from 'vue';
import { resolveBinaryConversion } from '../services/calculatorsService';

const form = reactive({
  value: '11001',
  sourceBase: 'binary'
});

const conversion = ref(null);
const error = ref('');

const baseOptions = [
  { value: 'binary', label: 'Binario (Base 2)' },
  { value: 'octal', label: 'Octal (Base 8)' },
  { value: 'decimal', label: 'Decimal (Base 10)' },
  { value: 'hexadecimal', label: 'Hexadecimal (Base 16)' }
];

async function handleConvert() {
  error.value = '';
  conversion.value = null;

  const response = await resolveBinaryConversion(form.value, form.sourceBase);

  if (!response.valid) {
    error.value = response.error;
    return;
  }

  conversion.value = response;
}

handleConvert();
</script>

<template>
  <section class="tool-panel">
    <header>
      <h2>Conversor Universal de Bases</h2>
      <p>Convierte entre binario, octal, decimal y hexadecimal desde cualquier base de origen.</p>
    </header>

    <form class="tool-form" @submit.prevent="handleConvert">
      <label>
        Valor de entrada
        <input v-model="form.value" placeholder="101011" />
      </label>
      <label>
        Base de origen
        <select v-model="form.sourceBase">
          <option v-for="base in baseOptions" :key="base.value" :value="base.value">{{ base.label }}</option>
        </select>
      </label>
      <button type="submit">Convertir</button>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>

    <div v-if="conversion?.results" class="result-stack">
      <p><strong>Binario:</strong> {{ conversion.results.binary }}</p>
      <p><strong>Octal:</strong> {{ conversion.results.octal }}</p>
      <p><strong>Decimal:</strong> {{ conversion.results.decimal }}</p>
      <p><strong>Hexadecimal:</strong> {{ conversion.results.hexadecimal }}</p>
    </div>
  </section>
</template>

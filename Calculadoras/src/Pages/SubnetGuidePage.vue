<script setup>
import { ref } from 'vue';
import { resolveSubnetGuide } from '../services/calculatorsService';

const prefix = ref(24);
const guide = ref(null);
const error = ref('');

async function handleGenerate() {
  error.value = '';
  const response = await resolveSubnetGuide(prefix.value);

  if (!response.valid) {
    guide.value = null;
    error.value = response.error;
    return;
  }

  guide.value = response;
}

handleGenerate();
</script>

<template>
  <section class="tool-panel">
    <header>
      <h2>Explicacion de Subneteo</h2>
      <p>Resumen del proceso practico para planificar subredes de manera correcta.</p>
    </header>

    <form class="tool-form" @submit.prevent="handleGenerate">
      <label>
        Prefijo CIDR
        <input v-model.number="prefix" type="number" min="0" max="32" />
      </label>
      <button type="submit">Generar guia</button>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>

    <div v-if="guide" class="guide-block">
      <p><strong>Bits de host:</strong> {{ guide.hostBits }}</p>
      <p><strong>Direcciones por subred:</strong> {{ guide.totalAddresses }}</p>
      <p><strong>Hosts usables:</strong> {{ guide.usableHosts }}</p>

      <ol>
        <li v-for="step in guide.steps" :key="step">{{ step }}</li>
      </ol>
    </div>
  </section>
</template>

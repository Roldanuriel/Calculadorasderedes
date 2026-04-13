<script setup>
import { computed, reactive, ref } from 'vue';
import MetricCard from '../components/shared/MetricCard.vue';
import { resolveIpCalculation } from '../services/calculatorsService';

const form = reactive({
  ip: '192.168.10.44',
  prefix: 24
});

const result = ref(null);
const error = ref('');
const isLoading = ref(false);

const metrics = computed(() => {
  if (!result.value || !result.value.valid) {
    return [];
  }

  return [
    { title: 'Red', value: result.value.network },
    { title: 'Broadcast', value: result.value.broadcast },
    { title: 'Mascara', value: result.value.netmask },
    { title: 'Wildcard', value: result.value.wildcard },
    { title: 'Primer Host', value: result.value.firstHost },
    { title: 'Ultimo Host', value: result.value.lastHost },
    { title: 'Hosts Totales', value: result.value.totalHosts },
    { title: 'Hosts Usables', value: result.value.usableHosts },
    { title: 'Clase', value: result.value.className }
  ];
});

async function handleSubmit() {
  isLoading.value = true;
  error.value = '';

  const data = await resolveIpCalculation(form.ip, form.prefix);

  if (!data.valid) {
    error.value = data.error;
    result.value = null;
    isLoading.value = false;
    return;
  }

  result.value = data;
  isLoading.value = false;
}

handleSubmit();
</script>

<template>
  <section class="tool-panel">
    <header>
      <h2>Calculadora de Redes IPv4</h2>
      <p>Calcula red, broadcast, rango de hosts y mascara bajo formato CIDR.</p>
    </header>

    <form class="tool-form" @submit.prevent="handleSubmit">
      <label>
        Direccion IPv4
        <input v-model="form.ip" placeholder="192.168.1.10" />
      </label>
      <label>
        Prefijo CIDR
        <input v-model.number="form.prefix" type="number" min="0" max="32" />
      </label>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Calculando...' : 'Calcular red' }}
      </button>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>

    <div v-if="metrics.length" class="metrics-grid">
      <MetricCard v-for="item in metrics" :key="item.title" :title="item.title" :value="item.value" />
    </div>
  </section>
</template>

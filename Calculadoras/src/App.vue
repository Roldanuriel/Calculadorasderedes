<script setup>
import { computed } from 'vue';
import BottomNav from './components/layout/BottomNav.vue';
import IpCalculatorPage from './pages/IpCalculatorPage.vue';
import BinaryConverterPage from './pages/BinaryConverterPage.vue';
import SubnetGuidePage from './pages/SubnetGuidePage.vue';
import ScientificCalculatorPage from './pages/ScientificCalculatorPage.vue';
import { useActiveTool } from './hooks/useActiveTool';

const { tools, activeTool, activeLabel, setActiveTool } = useActiveTool('ip');

const currentPage = computed(() => {
  const pageMap = {
    ip: IpCalculatorPage,
    binary: BinaryConverterPage,
    subnet: SubnetGuidePage,
    scientific: ScientificCalculatorPage
  };

  return pageMap[activeTool.value] || IpCalculatorPage;
});
</script>

<template>
  <main class="app-shell">
    <section class="hero-block">
      <p class="kicker">Suite de Redes y Calculo</p>
      <h1>{{ activeLabel }}</h1>
      <p class="hero-copy">
        Herramientas precisas para subneteo, conversiones binarias y calculo cientifico.
      </p>
    </section>

    <transition name="rise" mode="out-in">
      <component :is="currentPage" :key="activeTool" />
    </transition>

    <BottomNav :items="tools" :active-id="activeTool" @change="setActiveTool" />
  </main>
</template>

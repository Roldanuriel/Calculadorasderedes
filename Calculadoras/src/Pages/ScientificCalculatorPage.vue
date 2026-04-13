<script setup>
import { ref } from 'vue';
import { evaluateExpression } from '../utils/scientificMath';

const expression = ref('sqrt(144)+sin(pi/2)');
const result = ref('');
const error = ref('');

const shortcuts = [
  { label: 'sin(', value: 'sin(' },
  { label: 'cos(', value: 'cos(' },
  { label: 'tan(', value: 'tan(' },
  { label: 'sqrt(', value: 'sqrt(' },
  { label: 'log(', value: 'log(' },
  { label: 'ln(', value: 'ln(' },
  { label: 'π', value: 'π' },
  { label: 'e', value: 'e' },
  { label: '^', value: '^' }
];

function appendShortcut(shortcut) {
  expression.value += shortcut.value;
}

function clearAll() {
  expression.value = '';
  result.value = '';
  error.value = '';
}

function solve() {
  const calculated = evaluateExpression(expression.value);
  if (!calculated.valid) {
    error.value = calculated.error;
    result.value = '';
    return;
  }

  error.value = '';
  result.value = String(calculated.result);
}

solve();
</script>

<template>
  <section class="tool-panel">
    <header>
      <h2>Calculadora Cientifica</h2>
      <p>Soporta operaciones, parentesis, potencias y funciones trigonometricas.</p>
    </header>

    <div class="tool-form">
      <label>
        Expresion
        <input v-model="expression" placeholder="(15*3)-sqrt(9)+π" />
      </label>
      <div class="shortcut-grid">
        <button v-for="item in shortcuts" :key="item.label" type="button" @click="appendShortcut(item)">{{ item.label }}</button>
      </div>
      <div class="action-row">
        <button type="button" @click="solve">Resolver</button>
        <button type="button" @click="clearAll" class="ghost-btn">Limpiar</button>
      </div>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
    <div v-else class="result-stack">
      <p><strong>Resultado:</strong> {{ result || '-' }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  }
});
</script>

<template>
  <article class="metric-card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </article>
</template>

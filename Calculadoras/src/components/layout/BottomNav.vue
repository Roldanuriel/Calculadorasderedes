<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  activeId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['change']);
</script>

<template>
  <nav class="bottom-nav" aria-label="Navegacion de calculadoras">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="bottom-nav__button"
      :class="{ 'bottom-nav__button--active': item.id === activeId }"
      @click="emit('change', item.id)"
    >
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

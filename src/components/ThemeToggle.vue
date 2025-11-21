<script setup>
defineProps({
  currentTheme: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['toggle-theme']);

const handleClick = () => {
  emit('toggle-theme');
};
</script>

<template>
  <button
      @click="handleClick"
      class="btn-icon theme-toggle-button"
      :title="currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'"
  >
    <span v-if="currentTheme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style lang="sass" scoped>
// Используем стили btn-icon из main.scss, добавляем только размеры
.theme-toggle-button
  font-size: 1.5em
</style>
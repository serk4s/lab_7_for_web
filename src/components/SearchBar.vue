<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:searchQuery']);

const updateSearch = (event) => {
  emit('update:searchQuery', event.target.value);
};
</script>

<template>
  <div class="search-bar">
    <input
        type="text"
        :value="searchQuery"
        @input="updateSearch"
        placeholder="Search..."
        class="task-form-input"
    />
  </div>
</template>

<style lang="sass" scoped>

</style>
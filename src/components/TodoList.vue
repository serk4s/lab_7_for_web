<script setup>
import TodoItem from './TodoItem.vue';

defineProps({
  todos: {
    type: Array,
    required: true
  }
});

const emit = defineEmits([
  'delete-todo',
  'toggle-status',
  'update-text'
]);

const handleDelete = (id) => emit('delete-todo', id);
const handleToggle = (id) => emit('toggle-status', id);
const handleUpdate = (payload) => emit('update-text', payload);
</script>

<template>
  <div class="todo-list">
    <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="handleDelete"
        @toggle="handleToggle"
        @update="handleUpdate"
    />

    <div v-if="todos.length === 0" class="empty-message task-list-item">
      Список задач пуст.
    </div>
  </div>
</template>

<style lang="sass" scoped>
.todo-list
  // Стили для контейнера списка.
  // Элементы сами управляют своими границами.
  margin-top: 20px

.empty-message
  /* Добавляем базовые стили, чтобы empty-message выглядел как элемент списка */
  text-align: center
  justify-content: center
  padding: 15px
  opacity: 0.5
</style>
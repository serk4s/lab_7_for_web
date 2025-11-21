<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'add-todo']);

const newTodoText = ref('');

const submitTodo = () => {
  if (newTodoText.value.trim()) {
    emit('add-todo', newTodoText.value.trim());
    newTodoText.value = '';
  }
};

const handleBackdropClick = (event) => {
  // Используем прямой класс .modal
  if (event.target.classList.contains('modal')) {
    emit('close');
  }
};
</script>

<template>
  <div class="modal" @click="handleBackdropClick">
    <div class="modal-content">
      <h2>Добавить задачу</h2>
      <form @submit.prevent="submitTodo">
        <input
            type="text"
            v-model="newTodoText"
            placeholder="Что нужно сделать?"
            required
            class="task-form-input"
        >
        <div class="modal-actions">
          <button type="submit" class="btn-primary submit-btn">ADD</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// Классы .modal и .modal-content описаны в main.scss
h2
  margin-bottom: 20px
  text-align: center

form
  display: flex
  flex-direction: column
  gap: 10px

.modal-actions
  display: flex
  justify-content: flex-end
  margin-top: 10px

.submit-btn
  /* Оверрайд для отмены дефолтного ховера в миксине */
  &:hover
    background-color: transparent !important
    color: inherit !important
</style>
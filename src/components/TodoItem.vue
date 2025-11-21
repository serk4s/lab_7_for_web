<script setup>
import { ref } from 'vue';
// defineProps и defineEmits используются как макросы

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete', 'toggle', 'update']);

const isEditing = ref(false);
const editText = ref(props.todo.text);

const startEdit = () => {
  isEditing.value = true;
  editText.value = props.todo.text;
};

const finishEdit = () => {
  if (editText.value.trim() && editText.value !== props.todo.text) {
    emit('update', {
      id: props.todo.id,
      newText: editText.value.trim()
    });
  }
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const toggleCompletion = () => {
  emit('toggle', props.todo.id);
};

const deleteItem = () => {
  emit('delete', props.todo.id);
};
</script>

<template>
  <div
      :class="['task-list-item', { 'task-completed': props.todo.isCompleted }]"
  >
    <input
        type="checkbox"
        :checked="props.todo.isCompleted"
        @change="toggleCompletion"
        class="custom-checkbox"
    >

    <div class="task-content">
      <template v-if="isEditing">
        <input
            type="text"
            v-model="editText"
            @keyup.enter="finishEdit"
            @keyup.esc="cancelEdit"
            class="task-form-input edit-input"
        >
      </template>
      <template v-else>
                <span class="task-text">
                    {{ props.todo.text }}
                </span>
      </template>
    </div>


    <div class="actions">
      <button
          @click="isEditing ? finishEdit() : startEdit()"
          class="btn-icon"
          :title="isEditing ? 'Сохранить' : 'Редактировать'"
      >
        <span v-if="isEditing">💾</span>
        <span v-else>📝</span>
      </button>

      <button
          @click="deleteItem"
          class="btn-icon delete-btn"
          title="Удалить"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.task-content
  flex-grow: 1
  margin-right: 15px
  display: flex
  align-items: center

.task-text, .edit-input
  word-break: break-word
  font-size: 1em
  width: 100%
  border: none !important
  padding: 0 !important

.actions
  display: flex
  gap: 5px
  margin-left: 10px
</style>
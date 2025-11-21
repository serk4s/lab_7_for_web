<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'
// import { useUserStore } from '../stores/userStore' // УДАЛЕНО

const todoStore = useTodoStore()
const { myTodos } = storeToRefs(todoStore)

const newTodoText = ref('')
const editingId = ref(null)
const editText = ref('')

const addNewTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}

const startEditing = (todo) => {
  editingId.value = todo.id
  editText.value = todo.text
}

const saveEdit = () => {
  if (editingId.value && editText.value.trim()) {
    todoStore.editTodo(editingId.value, editText.value)
    cancelEdit()
  }
}

const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}
</script>

<template>
  <div class="todo-container">

    <div class="todo-header">
      <h1>Список задач</h1>
    </div>

    <div class="todo-workspace">

      <div class="input-group">
        <input
            v-model="newTodoText"
            @keyup.enter="addNewTodo"
            placeholder="Введите Имя для новой задачи..."
        />
        <button @click="addNewTodo">ДОБАВИТЬ</button>
      </div>

      <ul class="todo-list">
        <li v-for="todo in myTodos" :key="todo.id" :class="{ completed: todo.completed }">

          <template v-if="editingId !== todo.id">
            <div class="checkbox-wrapper">
              <input
                  type="checkbox"
                  :checked="todo.completed"
                  @change="todoStore.toggleTodo(todo.id)"
                  class="custom-checkbox"
              >
            </div>

            <span @dblclick="startEditing(todo)">{{ todo.text }}</span>

            <div class="btn-group">
              <button @click="startEditing(todo)" class="action-btn" title="Редактировать">✎</button>
              <button @click="todoStore.removeTodo(todo.id)" class="action-btn delete-btn" title="Удалить">✕</button>
            </div>
          </template>

          <template v-else>
            <input
                v-model="editText"
                @keyup.enter="saveEdit"
                @keyup.esc="cancelEdit"
                class="edit-input"
                auto-focus
            />
            <div class="btn-group">
              <button @click="saveEdit" class="action-btn" title="Сохранить">✓</button>
              <button @click="cancelEdit" class="action-btn" title="Отмена">✕</button>
            </div>
          </template>

        </li>
      </ul>

      <p v-if="myTodos.length === 0" style="text-align: center; opacity: 0.5; margin-top: 40px;">
        Список пуст. Добавьте задачу.
      </p>
    </div>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid var(--accent-color);
  border-radius: 0;
  background: var(--main-bg);
  accent-color: var(--primary-color);
  box-shadow: none;
  appearance: none;
  position: relative;
}

.custom-checkbox:checked {
  background: var(--primary-color);
}
.custom-checkbox:checked:after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--main-bg);
  font-size: 14px;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.edit-input {
  flex-grow: 1;
  margin: 0 10px;
  padding: 12px;
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid var(--accent-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 0;
  text-transform: none;
}
</style>
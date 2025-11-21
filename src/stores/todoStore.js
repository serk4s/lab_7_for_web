import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref([
        { id: 1, text: 'Проверить логику авторизации', completed: true },
        { id: 2, text: 'Реализовать темную тему', completed: false },
        { id: 3, text: 'Добавить функцию редактирования задач', completed: false }
    ])

    const myTodos = todos

    function addTodo(text) {
        todos.value.push({
            id: Date.now(),
            text: text,
            completed: false
        })
    }

    function toggleTodo(id) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    function removeTodo(id) {
        todos.value = todos.value.filter(t => t.id !== id)
    }

    function editTodo(id, newText) {
        const todo = todos.value.find(t => t.id === id)
        if (todo && newText.trim()) {
            todo.text = newText
        }
    }

    return { todos, myTodos, addTodo, toggleTodo, removeTodo, editTodo }
}, {
    persist: true
})
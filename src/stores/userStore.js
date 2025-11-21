import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    // Состояние
    const users = ref([]) // Список всех зарегистрированных пользователей
    const currentUser = ref(null) // Текущий пользователь

    // Геттеры
    const isAuthenticated = computed(() => !!currentUser.value)

    // Действия
    function register(email, password) {
        const existingUser = users.value.find(u => u.email === email)
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует')
        }

        const newUser = {
            id: Date.now(),
            email,
            password
        }

        users.value.push(newUser)
        // Сразу логиним после регистрации (по желанию)
        currentUser.value = newUser
    }

    function login(email, password) {
        const user = users.value.find(u => u.email === email && u.password === password)
        if (!user) {
            throw new Error('Неверный email или пароль')
        }
        currentUser.value = user
    }

    function logout() {
        currentUser.value = null
    }

    return { users, currentUser, isAuthenticated, register, login, logout }
}, {
    persist: true // Автоматическое сохранение в localStorage
})
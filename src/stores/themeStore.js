import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    // Проверяем, есть ли тема в localStorage, или устанавливаем светлую по умолчанию
    const isDark = ref(localStorage.getItem('theme') === 'dark')

    function toggleTheme() {
        isDark.value = !isDark.value
        updateBodyClass()
    }

    // Функция для применения класса к body
    function updateBodyClass() {
        if (isDark.value) {
            document.body.classList.add('dark-theme')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark-theme')
            localStorage.setItem('theme', 'light')
        }
    }

    // Инициализация при загрузке
    updateBodyClass()

    return { isDark, toggleTheme, updateBodyClass }
}, {
    persist: true
})
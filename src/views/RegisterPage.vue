<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const userStore = useUserStore()
const router = useRouter()

const handleRegister = () => {
  errorMsg.value = ''

  // Простая валидация email
  if (!email.value.includes('@')) {
    errorMsg.value = 'Введите корректный email'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Пароли не совпадают'
    return
  }

  try {
    userStore.register(email.value, password.value)
    router.push('/') // Редирект на главную
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>

<template>
  <div class="auth-page">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <input v-model="confirmPassword" type="password" placeholder="Повторите пароль" required />
      <button type="submit">Создать аккаунт</button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
    <p>Есть аккаунт? <router-link to="/login">Войти</router-link></p>
  </div>
</template>
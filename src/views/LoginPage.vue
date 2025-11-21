<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  try {
    userStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>

<template>
  <div class="auth-page">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
    <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
  </div>
</template>
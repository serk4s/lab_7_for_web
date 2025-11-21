<script setup>
import { useUserStore } from './stores/userStore'
import { useThemeStore } from './stores/themeStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()

themeStore.updateBodyClass()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav>
    <div class="brand-title">MY TO-DO</div>

    <div class="nav-links">
      <router-link to="/">Задачи</router-link>
      <router-link to="/about">О проекте</router-link>
    </div>

    <div class="right-side">
      <button @click="themeStore.toggleTheme" class="theme-btn" title="Сменить тему">
        {{ themeStore.isDark ? '☀' : '☾' }}
      </button>

      <div v-if="userStore.isAuthenticated" class="user-actions">
        <span class="user-email">{{ userStore.currentUser.email }}</span>
        <button @click="logout">ВЫЙТИ</button>
      </div>

      <div v-else>
        <router-link to="/login">ВХОД</router-link>
      </div>
    </div>
  </nav>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
.brand-title {
  grid-column: 1 / 2;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.right-side {
  display: flex;
  align-items: center;
  gap: 15px;
}

.theme-btn {
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: 500;
  min-width: 40px;
}

.user-email {
  font-weight: 300;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: none;
}

/* Media Queries для адаптивности */
@media (max-width: 700px) {
  .user-email {
    display: none;
  }
}

@media (max-width: 500px) {
  .brand-title {
    display: none;
  }
  nav {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 15px 20px;
  }
  .nav-links {
    grid-column: 1 / 3;
    justify-content: flex-start;
  }
  .right-side {
    grid-column: 3 / 4;
    justify-content: flex-end;
  }
}
</style>
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/TodoPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterPage.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutPage.vue')
        }
    ]
})

// Временная отладка: выводим в консоль, куда мы идем
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    console.log('Идем на:', to.path)
    console.log('Пользователь авторизован?', userStore.isAuthenticated)

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        console.log('Доступ запрещен! Редирект на логин.')
        next('/login')
    } else {
        next()
    }
})

export default router
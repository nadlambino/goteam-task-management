import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        name: 'register',
        path: '/register',
        component: () => import('./../pages/Register.vue'),
        meta: {
            title: 'Register'
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('./../pages/Login.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        name: 'dashboard',
        path: '/',
        component: () => import('./../pages/Dashboard.vue'),
        meta: {
            title: 'Dashboard'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

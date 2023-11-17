import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        name: 'register',
        path: '/register',
        component: () => import('./../pages/Register.vue'),
        meta: {
            title: `Register`
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('./../pages/Login.vue'),
        meta: {
            title: `Login`
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

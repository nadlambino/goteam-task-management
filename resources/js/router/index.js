import { createWebHistory, createRouter } from 'vue-router'

const routes = [
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

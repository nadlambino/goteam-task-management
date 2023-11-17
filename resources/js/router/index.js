import { createWebHistory, createRouter, useRouter } from 'vue-router'
import { useAuth } from '../stores/auth';

const routes = [
    {
        name: 'dashboard',
        path: '/',
        component: () => import('./../pages/Dashboard.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        }
    },
    {
        name: 'task',
        path: '/task',
        component: () => import('./../pages/Dashboard.vue'),
        meta: {
            title: 'Task',
            requiresAuth: true
        }
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuth();

    if (to.matched.some((route) => route.meta.requiresAuth)) {
        return auth.getUser().then(() => next());
    }
    
    next();
});

export default router

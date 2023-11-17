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
        name: 'tasks',
        path: '/tasks',
        component: () => import('./../pages/Tasks.vue'),
        meta: {
            title: 'Tasks',
            requiresAuth: true
        }
    },
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: () => import('./../pages/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuth();
    document.title = to.meta.title || document.title

    if (to.matched.some((route) => route.meta.requiresAuth)) {
        return auth.getUser().then(() => next()).catch(() => {
            window.location.href = '/login'
        });
    }
    
    next();
});

export default router

import { createWebHistory, createRouter } from 'vue-router'
import authMiddleware from '@/middlewares/authMiddleware';

const routes = [
    {
        name: 'dashboard',
        path: '/',
        component: () => import('@/pages/Dashboard.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        }
    },
    {
        name: 'tasks',
        path: '/tasks',
        component: () => import('@/pages/Tasks.vue'),
        meta: {
            title: 'Tasks',
            requiresAuth: true
        }
    },
    {
        path: '/tasks/create',
        name: 'tasks.create',
        component: () => import('@/pages/TaskCreate.vue'),
        meta: {
            title: 'Tasks | Create',
            requiresAuth: true
        }
    },
    {
        path: '/tasks/:id',
        name: 'tasks.id',
        component: () => import('@/pages/TaskEdit.vue'),
        props: route => ({ 
            id: route.params.id
        }),
        meta: {
            title: 'Tasks | Edit',
            requiresAuth: true
        }
    },
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(authMiddleware);

export default router

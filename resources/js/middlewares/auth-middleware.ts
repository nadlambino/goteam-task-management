import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    document.title = <string | undefined>to.meta?.title || document.title;

    if (to.matched.some((route) => route.meta?.requiresAuth)) {
        return authStore.getUser().then(() => next()).catch(() => {
            window.location.href = '/login';
        });
    }
    
    next();
}

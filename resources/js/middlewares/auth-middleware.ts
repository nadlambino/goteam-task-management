import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuth } from '../stores/auth';

export default (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const auth = useAuth();
    document.title = <string | undefined>to.meta?.title || document.title;

    if (to.matched.some((route) => route.meta?.requiresAuth)) {
        return auth.getUser().then(() => next()).catch(() => {
            window.location.href = '/login';
        });
    }
    
    next();
}

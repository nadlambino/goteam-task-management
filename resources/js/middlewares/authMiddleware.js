import { useAuth } from '../stores/auth';

export default (to, from, next) => {
    const auth = useAuth();
    document.title = to.meta.title || document.title;

    if (to.matched.some((route) => route.meta.requiresAuth)) {
        return auth.getUser().then(() => next()).catch(() => {
            window.location.href = '/login';
        });
    }
    
    next();
}

import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { User } from '@/declarations';

export const useAuth = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const authUser = ref<User | undefined>();

    const getUser = async (): Promise<User | undefined> => {
        if (authUser.value) return authUser.value;

        const response = await window.axios.get('/api/user');
        const user: User | undefined = await response?.data;

        isAuthenticated.value = user !== undefined;
        authUser.value = user;

        return authUser.value;
    }

    return {
        getUser,
        isAuthenticated
    }
});

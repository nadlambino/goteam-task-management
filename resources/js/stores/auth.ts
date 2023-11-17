import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { User } from '@/declarations';

export const useAuth = defineStore('auth', () => {
    const isAuthenticated = ref(false);

    const getUser = async (): Promise<User | undefined> => {
        const response = await window.axios.get('/api/user');
        const user: User | undefined = await response?.data;

        isAuthenticated.value = user !== undefined;

        return user;
    }

    return {
        getUser,
        isAuthenticated
    }
});

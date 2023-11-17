import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
    const isAuthenticated = ref(false);

    const getUser = async () => {
        const response = await axios.get('/api/user');
        const user = await response?.data;
        isAuthenticated.value = user !== undefined || user !== null;

        return user;
    }

    return {
        getUser,
        isAuthenticated
    }
});

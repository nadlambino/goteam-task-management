import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuth = defineStore('auth', () => {
    const authenticated = ref(false);
    const user = ref();
    const router = useRouter();

    const getUser = computed(() => authenticated && user ? user : null)

    const login = () => {
        return axios.get('/api/user').then(({data})=>{
            user.value = data;
            authenticated.value = true;
            router.push({name:'dashboard'})
        }).catch(({response:{data}})=>{
            user.value = null;
            authenticated.value = false;
        })
    }

    const logout = () => {
        user.value = null;
        authenticated.value = false;
    }

    return {
        getUser,
        login,
        logout
    }
});

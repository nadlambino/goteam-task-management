<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = await authStore.getUser();
</script>

<template>
    <h1 class="welcome">Hi, {{ user?.name }}</h1>
    <h5 class="note">You can view your current tasks and create new ones in a snap.</h5>
</template>

<style scoped lang="scss">
.welcome {
    @apply text-gray-700;
}

.note {
    @apply text-gray-400;
}
</style>

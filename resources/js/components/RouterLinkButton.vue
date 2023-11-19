<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
    label: String,
    to: RouteLocationRaw
}>();
</script>

<template>
    <router-link :to="to" class="btn-link">{{ label }}</router-link>
</template>

<style scoped lang="scss">
.btn-link {
    @apply px-2 py-1 no-underline rounded-md bg-blue-500 border-2 border-blue-500 border-solid 
    text-white capitalize tracking-wide hover:bg-blue-400 hover:border-blue-400 hover:text-white;
}
</style>

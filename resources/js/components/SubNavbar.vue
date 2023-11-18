<script setup lang="ts">
import RouterLinkButton from './RouterLinkButton.vue';

</script>

<template>
    <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/tasks">Tasks</router-link>
        <RouterLinkButton to="/tasks/create" label="Create Task" />
    </nav>
</template>

<style scoped lang="scss">
nav {
    @apply flex gap-7 justify-end items-center;
}
</style>
<script setup lang="ts">
import RouterLinkButton from './RouterLinkButton.vue';

</script>

<template>
    <nav>
        <slot></slot>
        <router-link class="sub-menu-item" to="/">Dashboard</router-link>
        <router-link class="sub-menu-item" to="/tasks">Tasks</router-link>
        <RouterLinkButton to="/tasks/create" label="Create" />
    </nav>
</template>

<style scoped lang="scss">
nav {
    @apply flex gap-7 gap-y-2 justify-end items-center flex-wrap;

    .sub-menu-item {
        @apply no-underline text-gray-600;

        &.router-link-exact-active {
            @apply text-blue-500;
        }
    }
}
</style>

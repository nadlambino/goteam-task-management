<script setup lang="ts">
import RouterLinkButton from '../components/RouterLinkButton.vue';

</script>

<template>
    <div class="content">
        <h1>Page Not Found</h1>
        <h5>The page that you are visiting might be broken or not available ☹️</h5>
        <RouterLinkButton to="/" label="Go back to dashboard" />
    </div>
</template>

<style lang="scss" scoped>
.content {
    h1 {
        @apply text-gray-600 m-0 leading-5 text-center;
    }

    h5 {
        @apply text-gray-400 m-0 text-center;
    }

    @apply flex flex-col justify-center items-center gap-5 h-[calc(100vh-120px)];
}
</style>
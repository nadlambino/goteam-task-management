<script setup>
import RouterLinkButton from '../components/RouterLinkButton.vue';

</script>

<template>
    <div class="content">
        <h1>Page Not Found</h1>
        <RouterLinkButton to="/" label="Go back to home" />
    </div>
</template>

<style lang="scss" scoped>
.content {
    @apply flex flex-col justify-center items-center gap-5 h-[calc(100vh-120px)];
}
</style>
<script setup lang="ts">

</script>

<template>
    <div class="task-empty">
        <h3 class="title">You do not have a task here...</h3>
    </div>
</template>

<style scoped lang="scss">
.task-empty {
    @apply w-full border border-dashed border-gray-400 rounded-md px-2 py-4;

    .title {
        @apply text-gray-400 text-sm text-center m-0;
    }
}
</style>

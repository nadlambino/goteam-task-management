<script setup lang="ts">
defineProps<{
    failedRequest: boolean
}>();

</script>

<template>
    <div class="task-empty">
        <template v-if="failedRequest">
            <h3 class="title">It seems like there's a problem retrieving your tasks.</h3>
            <h3 class="title mt-2">Please reload the page.</h3>
        </template>
        <h3 v-else class="title">You do not have a task here at the moment.</h3>
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

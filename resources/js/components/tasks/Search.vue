<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { useTasksStore } from '@/stores/tasks';

const taskStore = useTasksStore();
</script>

<template>
    <div class="search-container">
        <input v-model="taskStore.searchKey" type="text" class="search-input">
        <SearchIcon class="search-icon" />
    </div>
</template>

<style scoped lang="scss">
.search-container {
    @apply border border-gray-400 border-solid m-0 rounded-md px-2 py-1
    order-1 w-full flex gap-2 items-center;

    @apply md:w-72 md:order-[0];

    .search-input {
        @apply border-none outline-none m-0 w-full bg-transparent;
    }

    .search-icon {
        @apply w-5 h-5;
    }
}
</style>

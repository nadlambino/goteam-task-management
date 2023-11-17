<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import { useTasks } from '@/stores/tasks';
import { TaskStatus } from '@/declarations'

const tasks = useTasks();
</script>

<template>
    <SubNavbar />
    <p v-for="todo in tasks.todos">{{ todo.title }}</p>
    <button @click="tasks.getNextPage(TaskStatus.todo)">Get Next Page</button>
</template>
<script setup lang="ts">

</script>

<template>
    <div class="task-counter">
        <h1 class="counter"></h1>
        <h4 class="status"></h4>
    </div>
</template>

<style lang="scss" scoped>
.task-counter {
    @apply border border-gray-300 border-t-4 border-solid w-full text-center rounded-md p-5 animate-pulse
    flex flex-col gap-2 items-center;
    
    .counter {
        @apply m-0 font-bold font-['courier'] w-1/2 h-8 bg-gray-200;
    }

    .status {
        @apply m-0 text-gray-600 font-['courier'] w-full h-3 bg-gray-200;
    }
}
</style>

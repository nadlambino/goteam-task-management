<script setup>
const props = defineProps({
    label: String,
    to: String | Object
})
</script>

<template>
    <router-link :to="to" class="btn-link">{{ label }}</router-link>
</template>

<style scoped lang="scss">
.btn-link {
    @apply bg-white border-blue-500 border-solid border px-4 py-2 no-underline rounded-md
    hover:bg-blue-400 hover:text-white;
}
</style>
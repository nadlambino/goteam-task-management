<script setup>

</script>

<template>
    <nav>
        <ul>
            <li>
                <router-link 
                    to="/login">
                    Login
                </router-link>
            </li>
            <li>
                <router-link 
                    to="/register">
                    Register
                </router-link>
            </li>
        </ul>
    </nav>    
</template>

<style scoped lang="scss">
nav {
    @apply w-full bg-slate-200 flex justify-end items-center px-10 py-3 shadow-md;

    ul {
        @apply flex items-center justify-center m-0 p-0 gap-5 list-none;

        a {
            @apply no-underline py-1 px-2 rounded-md;

            &.router-link-active {
                @apply text-white bg-blue-500;
            }
        }
    }
}
</style>
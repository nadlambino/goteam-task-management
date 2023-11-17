<script setup lang="ts">
import SubNavbar from '../components/SubNavbar.vue';
import WelcomeUser from '../components/dashboard/WelcomeUser.vue';

</script>

<template>
    <SubNavbar />
    <Suspense>
        <WelcomeUser />
    </Suspense>
</template>
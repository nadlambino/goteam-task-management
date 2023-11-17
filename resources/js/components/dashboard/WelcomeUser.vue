<script setup>
import { useAuth } from './../../stores/auth';

const auth = useAuth();
const user = await auth.getUser();
</script>

<template>
    <div>
        <h1>Hello {{ user?.name }}</h1>
    </div>
</template>
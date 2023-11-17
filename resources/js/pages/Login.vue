<script setup>
import { useAuth } from './../stores/auth';

const auth = useAuth();
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form method="POST" @submit.prevent="auth.login">
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                                <div class="col-md-6">
                                    <input 
                                        id="email" 
                                        type="email" 
                                        v-model="auth.credentials.email"
                                        class="form-control" 
                                        name="email" 
                                        required 
                                        autocomplete="email" 
                                        autofocus
                                    />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                                <div class="col-md-6">
                                    <input 
                                        id="password" 
                                        type="password" 
                                        v-model="auth.credentials.password"
                                        class="form-control" 
                                        name="password" 
                                        required 
                                        autocomplete="current-password"
                                    />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">
                                        <label class="form-check-label" for="remember">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


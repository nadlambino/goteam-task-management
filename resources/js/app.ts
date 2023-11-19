import './bootstrap';
import '../sass/app.scss';
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue';
import { VueQueryPlugin } from "@tanstack/vue-query";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import Router from '@/router/index';

const pinia = createPinia();
const app = createApp({});

app.use(pinia);
app.use(Router);
app.use(plugin, defaultConfig);
app.use(VueQueryPlugin);

app.use(Vue3Toastify, {
  autoClose: 1000,
} as ToastContainerOptions);

app.mount('#app');

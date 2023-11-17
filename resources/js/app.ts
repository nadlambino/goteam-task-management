import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue';
import { VueQueryPlugin } from "@tanstack/vue-query";
import Router from '@/router/index';

const pinia = createPinia();
const app = createApp({});

app.use(pinia);
app.use(Router);
app.use(plugin, defaultConfig);
app.use(VueQueryPlugin)

app.mount('#app');

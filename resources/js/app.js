import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Router from './router';

const pinia = createPinia();
const app = createApp({});

app.use(pinia);
app.use(Router);

app.mount('#app');

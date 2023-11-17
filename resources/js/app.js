import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Router from './router';
import Navbar from './components/Navbar.vue';

const pinia = createPinia();
const app = createApp({});

app.use(pinia);
app.use(Router);

app.component('navbar', Navbar);

app.mount('#app');

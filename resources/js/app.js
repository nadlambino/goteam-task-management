import './bootstrap';
import '../sass/app.scss'
import { createApp } from 'vue';
import Router from './router'
import Navbar from './components/Navbar.vue'

const app = createApp({});
app.use(Router)

app.component('navbar', Navbar)

app.mount('#app');

import './bootstrap';
import { createApp } from 'vue';
import ExampleComponent from './components/ExampleComponent.vue';
import App from './App.vue';

const app = createApp({});

app.component('example-component', App);

app.mount('#app');

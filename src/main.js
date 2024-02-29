import '../public/assets/main.scss';

import router from './router';
import {createPinia} from "pinia";

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.component('app', App);
app.mount('#app');

import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import TasksList from "@/pages/TasksList.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/tasks-list',
        name: 'TasksList',
        component: TasksList
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
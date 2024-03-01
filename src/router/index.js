import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import TasksList from "@/pages/TasksList.vue";
import SeparateTask from "@/pages/SeparateTask.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/tasks-list',
        name: 'TasksList',
        component: TasksList,
    },
    {
        path: '/task/:id',
        name: 'task',
        component: SeparateTask,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
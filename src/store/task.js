import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {v4} from "uuid";
import dayjs from "dayjs";

export const useTaskStore = defineStore('task', () => {
    const taskList = ref([]);

    const createTask = ({title, body}) => {
        const taskId = v4();
        const creationDate = dayjs(new Date()).format('DD.MM.YYYY - HH:mm');
        taskList.value.push({taskId: taskId, title, body, creationDate: creationDate});
    }

    const deleteTask = (id) => {
        taskList.value = taskList.value.filter(task => task?.taskId !== id);
    }

    const changeTask = ({taskId, title, creationDate, body}) => {
        taskList.value = taskList.value.map((task) => {
            if (task?.taskId !== taskId) return task;
            return task = {
                taskId,
                title,
                creationDate: `${dayjs(new Date()).format('DD.MM.YYYY - hh:mm')} (Изменено)`,
                body
            };
        })
    }

    return {
        taskList: computed(() => taskList.value),
        createTask,
        changeTask,
        deleteTask
    };
})
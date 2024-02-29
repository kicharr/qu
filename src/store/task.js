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
        saveTaskListInLocalStorage();
    }
    const changeTask = ({taskId, title, body}) => {
        taskList.value = taskList.value.map((task) => {
            if (task?.taskId !== taskId) return task;
            const updatedCreationDate = `${dayjs(new Date()).format('DD.MM.YYYY - hh:mm')} (Изменено)`;
            return task = {
                taskId, title, creationDate: updatedCreationDate, body
            };
        });

        saveTaskListInLocalStorage(taskList.value)
    }
    const deleteTask = (id) => {
        taskList.value = taskList.value.filter(task => task?.taskId !== id);

        const taskListInLocalStorage = JSON.parse(localStorage.getItem('taskList'));

        saveTaskListInLocalStorage(taskListInLocalStorage.filter(task => task?.taskId !== id))
    }

    // Working with local storage
    const saveTaskListInLocalStorage = (updatedData) => {
        const taskListStringed = JSON.stringify(!updatedData ? taskList.value : updatedData);
        localStorage.setItem('taskList', taskListStringed);
    }

    const checkTaskListInLocalStorage = () => {
        const taskListArrayed = JSON.parse(localStorage.getItem('taskList'));
        taskList.value = [...taskListArrayed];
    }

    return {
        taskList: computed(() => taskList.value),
        createTask,
        changeTask,
        deleteTask,
        checkTaskListInLocalStorage
    };
})
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {v4} from "uuid";
import dayjs from "dayjs";
import {convertingTimestamp, getTimeStamp} from "@/lib/utilities.js";

export const useTaskStore = defineStore('task', () => {
    const taskList = ref([]);
    const currentTask = ref({});
    const createTask = ({title, body}) => {
        taskList.value.push(
            {
                taskId: v4(),
                title,
                body,
                creationDate: getTimeStamp()
            }
        );
        saveTaskListInLocalStorage();
    }
    const getCurrentTask = (id) => {
        if (!taskList.value.length) checkTaskListInLocalStorage();
        currentTask.value = taskList.value.filter(task => task?.taskId === id)[0];
    }
    const changeTask = (newData) => {

        taskList.value = taskList.value.map((task) => {
            if (task?.taskId !== newData?.taskId) return task;

            return {
                taskId: newData?.taskId,
                title: newData?.title,
                creationDate: newData?.creationDate,
                body: newData?.body,
                edited: {
                    editTime: getTimeStamp(), oldValue: {title: task?.title, body: task?.body}
                }
            }
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
        currentTask: computed(() => currentTask.value),
        getCurrentTask,
        createTask,
        changeTask,
        deleteTask,
        checkTaskListInLocalStorage
    };
})
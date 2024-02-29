<script setup>
import TaskCard from "@/components/tasks-components/TaskCard.vue";
import TaskManagerModal from "@/components/tasks-components/TaskManagerModal.vue";

import {showAnimationAccept} from "@/lib/utilities.js";

import {computed, onMounted, ref} from "vue";
import {useTaskStore} from "@/store/task.js";


const taskStore = useTaskStore();

const taskList = computed(() => taskStore.taskList);

const isModalVissible = ref(false);

const isTaskToChange = ref(null);
const changeTaskManagerModalVissible = () => {
  isModalVissible.value = !isModalVissible.value;

  if (!isModalVissible.value) {
    isTaskToChange.value = null
  }
}
const addNewTask = (data) => {
  taskStore.createTask(data);
};
const deleteTask = (id) => {
  taskStore.deleteTask(id);
}
const changeTaskModal = (id) => {

  isTaskToChange.value = id;
  changeTaskManagerModalVissible();

}
const updateTask = (data, elId) => {
  taskStore.changeTask(data);
  changeTaskManagerModalVissible();

  showAnimationAccept(`${elId}`, 'show-accept');
}
</script>

<template>

  <TaskManagerModal
      v-if="isModalVissible"

      :currentChangedTask="isTaskToChange"
      :taskList="taskList"

      @changeModalVisible="changeTaskManagerModalVissible"
      @saveNewTask="addNewTask"
      @updateTask="updateTask"
  />

  <main class="main container">
    <div class="actions">
      <button @click="changeTaskManagerModalVissible" class="button actions__button">Создать задачу</button>
    </div>

    <div class="tasks-list">
      <TaskCard
          v-if="taskStore.taskList.length"
          v-for="task in taskList"

          :key="task.id"
          :taskData="task"

          @deleteTask="deleteTask"
          @changeTaskModal="changeTaskModal"
      />
      <h3 v-else class="tasks-list__message">Задач нет</h3>
    </div>
  </main>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  justify-content: flex-end;
  padding: .5rem 0;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 20rem;

  &__message {
    text-align: center;
  }
}
</style>
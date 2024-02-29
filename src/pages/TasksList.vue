<script setup>
import TaskCard from "@/components/tasks-components/TaskCard.vue";
import TaskManagerModal from "@/components/tasks-components/TaskManagerModal.vue";

import {showAnimation} from "@/lib/utilities.js";

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
  showAnimation(`buttonSaveTask`, 'show-accept', 'green');
};
const deleteTask = (id) => {
  showAnimation(`card-${id}`, 'show-delete', 'red');
  setTimeout(() => {
    taskStore.deleteTask(id);
  }, 500);
}
const changeTaskModal = (id) => {
  isTaskToChange.value = id;
  changeTaskManagerModalVissible();
}
const updateTask = (data, elId) => {
  taskStore.changeTask(data);
  changeTaskManagerModalVissible();

  showAnimation(`${elId}`, 'show-accept', 'green');
}

onMounted(() => {
  taskStore.checkTaskListInLocalStorage();
})
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
      <RouterLink class="button button--link-back" to="/">Вернуться на главную страницу</RouterLink>
      <button id="buttonSaveTask" @click="changeTaskManagerModalVissible" class="button actions__button">Создать задачу</button>
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
@import "../../public/assets/main";

.actions {
  display: flex;
  justify-content: space-between;
  padding: .5rem 0;
  margin-bottom: 1rem;
  gap: 1rem;

  @include mobile {
    gap: .5rem;
    flex-direction: column;
  }
}

.tasks-list {

  &__message {
    margin-top: calc(50vh - 15px);
    color: #FFFFFF;
    text-align: center;
    font-weight: 400;
  }
}
</style>
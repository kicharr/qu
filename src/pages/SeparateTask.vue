<script setup>
import {computed, onMounted, ref} from "vue";
import {useTaskStore} from "@/store/task.js";
import {useRoute} from 'vue-router'

const route = useRoute();

const taskStore = useTaskStore();

const currentTaskData = computed(() => taskStore.currentTask);
onMounted(() => {
  taskStore.getCurrentTask(route.params.id);
})
</script>

<template>
  <div class="container">
    <div class="actions">
      <RouterLink class="button button--link-back" to="/tasks-list">Вернуться к списку всех задач</RouterLink>
    </div>

    <div class="task-info">
      <div class="task-info__item">
        <p>Название задачи</p>
        <h1>{{ currentTaskData?.title }}</h1>
      </div>

      <div class="task-info__item">
        <p>Описание задачи</p>
        <pre>{{ currentTaskData?.body }}</pre>
      </div>
    </div>

    <div class="task-data-settings">
      <p>Даты редактирования задачи</p>
      <div class="task-settings">
        <div class="task-settings__creation">
          <h3>Дата создания</h3>
          <pre>{{ currentTaskData?.creationDate }}</pre>
        </div>
      </div>

      <div v-if="currentTaskData?.edited" class="task-settings">
        <div class="task-settings__creation">
          <h3>Даты редактирования</h3>
          <ul>
            <li v-for="(item, index) in currentTaskData?.edited" :key="index">
              {{ item?.editDate }}
            </li>
          </ul>
        </div>
      </div>

    </div>


  </div>
</template>

<style scoped lang="scss">
@import "public/assets/main";

.actions {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.button {
  &--link-back {
    padding: 0;
    font-size: .7rem;
  }

  &--close {
    margin-left: auto;
  }
}

.task-data-settings {
  color: #FFFFFF;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  p {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.5rem;
  }
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #FFFFFF;
  font-size: 1.5rem;
  margin-bottom: 2rem;

  &__item {
    h1 {
      font-size: .8rem;
      background-color: #3b3b3b;
      padding: 1rem 1.5rem;
      border-radius: .5rem;
      -webkit-box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
      -moz-box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
      box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
    }

    p {
      margin-bottom: 1rem;
      font-weight: 700;
    }

    pre {
      font-size: .8rem;
      background-color: #3b3b3b;
      padding: 1rem 1.5rem;
      border-radius: .5rem;
      -webkit-box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
      -moz-box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
      box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
    }
  }

}

.task-settings {
  background-color: #3b3b3b;
  padding: 1rem 1.5rem;
  border-radius: .5rem;
  -webkit-box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
  -moz-box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .75);

  &__creation {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

</style>
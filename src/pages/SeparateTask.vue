<script setup>
import {computed, onMounted, ref} from "vue";
import {useTaskStore} from "@/store/task.js";
import {useRoute} from 'vue-router'
import {
  checkLinkMatch,
  comparingStringsDifferencesBody,
  comparingStringsDifferencesTitle,
} from "../lib/string-handling.js";
import {convertingTimestamp} from "../lib/utilities.js";

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

      <div class="task-info__item--bg-default">
        <p>Ссылки в тексте</p>
        <pre v-html="checkLinkMatch(currentTaskData?.body)"></pre>
      </div>
    </div>

    <div class="task-data-settings">
      <p>Даты редактирования задачи</p>
      <div class="task-settings">
        <div class="task-settings__creation">
          <h3>Дата создания</h3>
          <p>{{ convertingTimestamp(currentTaskData?.creationDate) }}</p>
        </div>
      </div>

      <div v-if="currentTaskData?.edited" class="task-settings">
        <div class="task-settings__creation">
          <h3>Последняя дата редактирования</h3>
          <p>{{ convertingTimestamp(currentTaskData?.edited?.editTime) }}</p>
        </div>
        <div class="changed-data">
          <pre
              v-html="comparingStringsDifferencesTitle(currentTaskData?.edited?.oldValue?.title, currentTaskData?.title)"></pre>
          <pre
              v-html="comparingStringsDifferencesBody(currentTaskData?.edited?.oldValue, {title: currentTaskData?.title, body: currentTaskData?.body})"></pre>
        </div>
      </div>

    </div>


  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/main";
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
      @include insertBoxShadow;
      background-color: $mainColor;
    }

    p {
      margin-bottom: 1rem;
      font-weight: 700;
    }

    pre {
      font-size: .8rem;
      @include insertBoxShadow;
      background-color: $mainColor;
    }

    &--bg-default {

      pre {
        background-color: transparent;
        padding: 0;
        font-size: .65rem;


      }

      p {
        margin-bottom: 1rem;
      }
    }
  }

}

.task-settings {
  @include insertBoxShadow;
  background-color: $mainColor;

  &__creation {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      font-size: .8rem;
      font-weight: 400;
      @include insertBoxShadowDark;
    }
  }
}


.changed-data {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  pre {
    display: inline-block;
    font-size: .7rem;
    @include insertBoxShadowDark;
  }
}
</style>
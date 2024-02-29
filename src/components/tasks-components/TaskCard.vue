<script setup>
import {stringValidation} from "@/lib/utilities.js";

const emits = defineEmits(['deleteTask', 'changeTaskModal']);
const props = defineProps(['taskData']);
const deleteCurrentTask = () => emits('deleteTask', props.taskData?.taskId);
const changeTaskModal = () => emits('changeTaskModal', props.taskData?.taskId);

</script>

<template>

  <div :id="`card-${taskData?.taskId}`" class="card">
    <div class="card__settings">
      <div class="task-data">
        <span>{{ taskData?.taskId }}</span>
        <span>{{ !taskData?.edited ? taskData?.creationDate  : taskData?.edited[taskData?.edited.length - 1].editDate  }}</span>
      </div>
      <div class="settings-action">
        <button @click="changeTaskModal" class="button--card-settings button--card-settings__edit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3 17.25V21H6.75L17.81 9.94003L14.06 6.19003L3 17.25ZM20.71 7.04003C21.1 6.65003 21.1 6.02003 20.71 5.63003L18.37 3.29003C17.98 2.90003 17.35 2.90003 16.96 3.29003L15.13 5.12003L18.88 8.87003L20.71 7.04003V7.04003Z"
                fill="white" fill-opacity="0.87"/>
          </svg>
        </button>
        <button @click="deleteCurrentTask" class="button--card-settings button--card-settings__delete">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 6.73001C20.98 6.73001 20.95 6.73001 20.92 6.73001C15.63 6.20001 10.35 6.00001 5.11998 6.53001L3.07998 6.73001C2.65998 6.77001 2.28998 6.47001 2.24998 6.05001C2.20998 5.63001 2.50998 5.27001 2.91998 5.23001L4.95998 5.03001C10.28 4.49001 15.67 4.70001 21.07 5.23001C21.48 5.27001 21.78 5.64001 21.74 6.05001C21.71 6.44001 21.38 6.73001 21 6.73001Z"
                fill="white"/>
            <path
                d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z"
                fill="white"/>
            <path
                d="M15.21 22.75H8.79002C5.30002 22.75 5.16002 20.82 5.05002 19.26L4.40002 9.19001C4.37002 8.78001 4.69002 8.42001 5.10002 8.39001C5.52002 8.37001 5.87002 8.68001 5.90002 9.09001L6.55002 19.16C6.66002 20.68 6.70002 21.25 8.79002 21.25H15.21C17.31 21.25 17.35 20.68 17.45 19.16L18.1 9.09001C18.13 8.68001 18.49 8.37001 18.9 8.39001C19.31 8.42001 19.63 8.77001 19.6 9.19001L18.95 19.26C18.84 20.82 18.7 22.75 15.21 22.75Z"
                fill="white"/>
            <path
                d="M13.66 17.25H10.33C9.92002 17.25 9.58002 16.91 9.58002 16.5C9.58002 16.09 9.92002 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z"
                fill="white"/>
            <path
                d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                fill="white"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="card__heading">
      <RouterLink class="card-link" :to="{name: 'task', params: {id: taskData?.taskId}}">
        {{ stringValidation(taskData?.title, 150) }}
      </RouterLink>
    </div>
    <div class="card__body">
      <pre>{{ taskData?.body }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../../public/assets/main";

.card {
  width: 100%;
  z-index: 6;
  background: $mainColor;
  padding: 1rem 2rem;
  color: #FFFFFF;
  border-radius: 1rem;
  margin-bottom: 2rem;
  position: relative;
  transition: $transition;

  @include tablet {
    padding: .5rem 1rem;
  }

  &__settings {
    display: flex;
    gap: .5rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    position: relative;

    &::after {
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      content: "";
      width: 100%;
      height: .1rem;
      background-color: rgba(227, 227, 227, 0.6);
    }

    @include mobile {
      flex-direction: column-reverse;
    }
  }


  &__heading {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      cursor: pointer;
      width: 100%;
      display: inline-block;

      @include tablet {
        font-size: .8rem;
      }
    }

  }

  &__body {
    font-size: .8rem;
  }

  &:hover {
    @include taskCardBoxShadow;
  }
}

pre {
  @include tablet {
    font-size: .7rem;
  }
}

.task-data {
  display: flex;
  flex-direction: column;

  span {
    color: #a1a1a1;
    display: inline-block;
    font-size: .6rem;
    text-wrap: nowrap;
  }

  @include mobile {
    align-items: center;
  }
}

.settings-action {
  display: flex;
  gap: .5rem;
}

.card-link {
  font-size: 1.17rem;
  font-weight: 700;
  text-decoration: underline;
}
</style>
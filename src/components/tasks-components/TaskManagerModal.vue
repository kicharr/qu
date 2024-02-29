<script setup>
import {ref, watch} from "vue";
import {handleErrors, removingErrorHandling} from "@/lib/utilities.js";

const props = defineProps(['currentChangedTask', 'taskList']);
const emit = defineEmits(['changeModalVisible', 'saveNewTask', 'updateTask']);

const isChangeTaskTitle = props.taskList.filter(task => task.taskId === props.currentChangedTask)[0]?.title;
const isChangeTaskBody = props.taskList.filter(task => task.taskId === props.currentChangedTask)[0]?.body;
const isChangeTaskCreationDate = props.taskList.filter(task => task.taskId === props.currentChangedTask)[0]?.creationDate;

const title = ref(isChangeTaskTitle ? isChangeTaskTitle : '');
const body = ref(isChangeTaskBody ? isChangeTaskBody : '');
const changeModalVisible = (e) => {
  if (document.getElementById('modal')?.contains(e?.target) && e?.currentTarget?.id !== 'buttonClose') return;
  emit('changeModalVisible');
}

watch(title, (val) => removingErrorHandling('textareaName'))
watch(body, (val) => removingErrorHandling('textareaBody'));

const saveNewTask = () => {
  if (title.value && body.value) {

    emit('saveNewTask', {
      title: title.value,
      body: body.value
    });

    title.value = '';
    body.value = '';

    changeModalVisible();

    document.querySelector('.textarea').classList.remove('textarea--error');
  } else {
    handleErrors(title.value, body.value);
    console.log('Данные не заполнены.')
  }
}

const updateTask = () => {
  emit('updateTask', {
    taskId: props.currentChangedTask,
    title: title.value,
    body: body.value,
    creationDate: isChangeTaskCreationDate
  }, document.getElementById(`card-${props.currentChangedTask}`)?.id);
}

</script>

<template>
  <div @click="changeModalVisible" class="modal-wrapper">
    <div id="modal" class="modal">
      <div class="modal__heading">
        <h2>{{ currentChangedTask === null ? `Новая задача` : `Редактировать задачу` }} </h2>
        <button id="buttonClose" @click="changeModalVisible" class="button--close">
          <img src="/images/close.svg" alt="Закрыть">
        </button>
      </div>
      <div class="modal__body">
        <label>
          Имя задачи
          <textarea v-model="title" id="textareaName" class="textarea" tabindex="1" placeholder="Введите название"
                    required cols="10"></textarea>
        </label>
        <label>
          Тело задачи
          <textarea v-model="body" id="textareaBody" class="textarea" tabindex="2" placeholder="Введите описание"
                    required cols="10"></textarea>
        </label>
      </div>
      <div class="modal__actions">
        <button v-if="currentChangedTask" @click="updateTask" class="button button--transparent" tabindex="3">Обнвоить
        </button>
        <button v-else @click="saveNewTask" class="button button--transparent" tabindex="3">Сохранить</button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/main";

.modal-wrapper {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 10, 0.8);

  @include tablet {
    padding: 0 .5rem;
  }
}

.modal {
  position: absolute;
  top: calc(50% - 9.87rem);
  left: calc(50% - 12.5rem);
  background: $mainColor;
  padding: 1rem 2rem;
  border-radius: .3rem;
  color: #FFFFFF;
  max-width: 25rem;
  width: 100%;
  -webkit-animation: $showAnimation;
  -o-animation: $showAnimation;
  animation: $showAnimation;

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    h2 {
      @include tablet {
        font-size: 1rem;
      }
    }

    @include tablet {
      margin-bottom: .5rem;
    }
  }

  @include tablet {
    position: relative;
    top: calc(50% - 9.87rem);
    left: 0;
  }

  @include mobile {
    padding: .5rem .8rem;
  }
}

label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.5rem;

  @include tablet {
    font-size: .7rem;
    margin-bottom: 1rem;
  }
}
</style>
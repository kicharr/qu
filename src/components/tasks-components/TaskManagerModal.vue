<script setup>
import {onMounted, ref} from "vue";

const props = defineProps(['currentChangedTask', 'taskList']);
const emit = defineEmits(['changeModalVisible', 'saveNewTask', 'updateTask']);

const isChangeTaskTitle = props.taskList.filter(task => task.taskId === props.currentChangedTask)[0]?.title;
const isChangeTaskBody = props.taskList.filter(task => task.taskId === props.currentChangedTask)[0]?.body;
const isChangeTaskCreationDate = props.taskList.filter(task => task.taskId === props.currentChangedTask)[0]?.creationDate;


const title = ref(isChangeTaskTitle ? isChangeTaskTitle : '');
const body = ref(isChangeTaskBody ? isChangeTaskBody : '');
const changeModalVisible = () => emit('changeModalVisible');

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
    if (!body.value && !title.value) document.querySelectorAll('.textarea').forEach(el => el.classList.add('textarea--error'));
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
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal__heading">
        <h2>{{  currentChangedTask === null ? `Новая задача` : `Редактировать задачу` }} </h2>
        <button @click="changeModalVisible" class="button--close">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 64 64" fill="none">
            <path
                d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
                fill="#FFF  "/>
          </svg>
        </button>
      </div>
      <div class="modal__body">
        <label>
          Имя задачи
          <textarea v-model="title" class="textarea" tabindex="1" placeholder="Введите название" required></textarea>
        </label>
        <label>
          Тело задачи
          <textarea v-model="body" class="textarea" tabindex="2" placeholder="Введите описание" required></textarea>
        </label>
      </div>
      <div class="modal__actions">
        <button v-if="currentChangedTask" @click="updateTask" class="button button--transparent" tabindex="3">Обнвоить</button>
        <button v-else @click="saveNewTask" class="button button--transparent" tabindex="3">Сохранить</button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/vars";

.modal-wrapper {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 10, 0.8);
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
  }
}

label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.5rem;
}
</style>
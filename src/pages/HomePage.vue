<script setup>

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <RouterLink class="button" to="/tasks-list">Перейти к списку задач</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
}

.wrapper {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
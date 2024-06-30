<script setup lang="ts">
import CreateTaskDialog from "./dialogues/CreateTaskDialog.vue";
import TaskComponent from "../components/TaskComponent.vue";
</script>

<template>
  <div class="flex flex-col p-2">
    <div class="ml-auto flex-shrink-0">
      <CreateTaskDialog></CreateTaskDialog>
    </div>
    <TaskComponent></TaskComponent>
  </div>
</template>

<style scoped></style>

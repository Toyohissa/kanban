<script setup lang="ts">
import CreateTaskDialog from "./dialogues/CreateTaskDialog.vue";
import TaskComponent from "../components/TaskComponent.vue";
</script>

<template>
  <div class="flex flex-col p-2">
    <div class="ml-auto flex-shrink-0 p-5">
      <CreateTaskDialog></CreateTaskDialog>
    </div>
    <div class="flex items-start justify-between p-5">
      <div class="flex flex-col items-center gap-2 justify-center">
        <TaskComponent statusToShow="Todo" desiredStatus="TODO"></TaskComponent>
      </div>
      <div class="flex flex-col items-center gap-2 justify-center">
        <TaskComponent
          statusToShow="In Progress"
          desiredStatus="IN_PROGRESS"
        ></TaskComponent>
      </div>
      <div class="flex flex-col items-center gap-2 justify-center">
        <TaskComponent statusToShow="Done" desiredStatus="DONE"></TaskComponent>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

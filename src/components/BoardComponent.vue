<script setup lang="ts">
import CreateTaskDialog from "./dialogues/CreateTaskDialog.vue";
import TaskComponent from "../components/TaskComponent.vue";
import DeleteBoardDialog from "./dialogues/DeleteBoardDialog.vue";
</script>

<template>
  <div class="flex flex-col p-2">
    <div class="ml-auto p-5 flex items-center gap-2">
      <CreateTaskDialog></CreateTaskDialog>
      <DeleteBoardDialog></DeleteBoardDialog>
    </div>
    <div class="flex items-start gap-5 w-full p-5">
      <TaskComponent
        class="w-96 border"
        statusToShow="Todo"
        desiredStatus="TODO"
      ></TaskComponent>
      <TaskComponent
        class="w-96"
        statusToShow="In Progress"
        desiredStatus="IN_PROGRESS"
      ></TaskComponent>
      <TaskComponent
        class="w-96"
        statusToShow="Done"
        desiredStatus="DONE"
      ></TaskComponent>
    </div>
  </div>
</template>

<style scoped></style>

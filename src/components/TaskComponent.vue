<script setup lang="ts">
import { computed, ref } from "vue";
import { useBoardStore } from "../pinia/board.pinia";
import { ITask } from "../ts/board.types";
import BaseDialog from "./base/BaseDialog.vue";

const useBoard = useBoardStore();

const allBoards = computed(() => {
  return useBoard.getAllBoards;
});

const selectedBoardId = computed(() => {
  const selectedBoard = allBoards.value.find((board) => board.selected);
  return selectedBoard ? selectedBoard.id : null;
});

const selectedBoardTasks = computed(() => {
  const boardId = selectedBoardId.value;
  if (boardId !== null) {
    const selectedBoard = allBoards.value.find((board) => board.id === boardId);
    return selectedBoard ? selectedBoard.tasks : [];
  }
  return [];
});

const dialogActive = ref<boolean>(false);

const selectedTask = ref<ITask>();

const changeSubtaskStatus = (subTaskId: number) => {
  if (!selectedBoardId.value || !selectedTask.value) return;

  const subTaskIndex = selectedTask.value.subTasks.findIndex(
    (subTask) => subTask.id === subTaskId
  );
  if (subTaskIndex !== -1) {
    const newStatus = !selectedTask.value.subTasks[subTaskIndex].status;
    useBoard.changeSubtaskStatus(
      selectedBoardId.value,
      selectedTask.value.boardId,
      subTaskId
    );
    selectedTask.value.subTasks[subTaskIndex].status = newStatus;
  }
};

const showTaskDialog = (task: ITask) => {
  selectedTask.value = task;
  dialogActive.value = true;
};
const doneSubtasks = computed(() => {
  return { subTasks: selectedTask.value?.subTasks.length, doneQuantity: 0 };
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="bg-white p-2 shadow-xl w-[200px] h-[80px] flex items-center justify-center rounded-lg hover:scale-110 transition-all cursor-pointer"
      v-for="task in selectedBoardTasks"
      :key="task.boardId"
      @click="showTaskDialog(task)"
    >
      <h1>{{ task.title }}</h1>
      <h1>{{ doneSubtasks.doneQuantity }} of {{ doneSubtasks.subTasks }}</h1>
    </div>

    <BaseDialog
      v-if="selectedTask"
      v-model="dialogActive"
      :title="selectedTask.title"
      :closeable="true"
    >
      <div
        class="w-[400px] bg-white p-5 rounded-t-lg h-[500px] flex flex-col gap-5 overflow-y-scroll"
      >
        <div class="flex flex-col gap-2">
          <h1>Description</h1>
          <p>{{ selectedTask.description }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <h1>Subtasks</h1>
          <ul class="flex flex-col gap-2">
            <li
              class="flex items-center gap-2 cursor-pointer"
              v-for="subTask in selectedTask.subTasks"
              :key="subTask.id"
              @click="changeSubtaskStatus(subTask.id)"
            >
              <div
                :class="subTask.status ? 'bg-[#635fc7]' : 'bg-white'"
                class="flex items-center h-6 w-6 justify-center border rounded-lg p-1 transition-all text-white"
              >
                <i
                  v-if="subTask.status"
                  class="fa-solid fa-check"
                  style="color: #ffffff"
                ></i>
              </div>
              {{ subTask.title }}
            </li>
          </ul>
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<style scoped></style>

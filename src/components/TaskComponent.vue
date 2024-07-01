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

const statuses = [
  { value: "TODO", text: "Todo" },
  { value: "IN_PROGRESS", text: "In Progress" },
  { value: "DONE", text: "Done" },
];

const statusDropdownActive = ref<boolean>(false);

const toggleDropdown = () => {
  statusDropdownActive.value = !statusDropdownActive.value;
};

const closeDropdown = () => {
  statusDropdownActive.value = false;
};

const changeSubtaskStatus = (subTaskId: number) => {
  if (!selectedBoardId.value || !selectedTask.value) return;

  const subTaskIndex = selectedTask.value.subTasks.findIndex(
    (subTask) => subTask.id === subTaskId
  );
  if (subTaskIndex !== -1) {
    const newStatus = !selectedTask.value.subTasks[subTaskIndex].status;
    useBoard.changeSubtaskStatus(
      selectedBoardId.value,
      selectedTask.value.taskId,
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
  if (!selectedTask.value) {
    return { subTasks: 0, doneQuantity: 0 };
  }
  const doneQuantity = selectedTask.value.subTasks.filter(
    (subTask) => subTask.status
  ).length;
  return {
    subTasks: selectedTask.value.subTasks.length,
    doneQuantity,
  };
});

const getDoneSubtasks = (task: ITask) => {
  const doneQuantity = task.subTasks.filter((subTask) => subTask.status).length;
  return {
    subTasks: task.subTasks.length,
    doneQuantity,
  };
};

const selectStatus = (status: string) => {
  if (!selectedBoardId.value) return;
  if (selectedTask.value) {
    selectedTask.value.status = status;

    useBoard.changeTaskStatus(
      selectedBoardId.value,
      selectedTask.value.taskId,
      status
    );
    closeDropdown();
  }
};

const readableStatus = computed(() => {
  if (selectedTask.value) {
    const status = statuses.find((s) => s.value === selectedTask.value!.status);
    return status ? status.text : "";
  }
  return "";
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="bg-white p-2 shadow-xl w-[200px] min-h-[80px] flex flex-col items-center justify-center rounded-lg hover:scale-110 transition-all cursor-pointer"
      v-for="task in selectedBoardTasks"
      :key="task.taskId"
      @click="showTaskDialog(task)"
    >
      <h1>{{ task.title }}</h1>
      <h1>
        {{ getDoneSubtasks(task).doneQuantity }} of
        {{ getDoneSubtasks(task).subTasks }}
      </h1>
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
        <h1 class="font-bold">{{ selectedTask.title }}</h1>

        <p class="text-[#828FA3]">{{ selectedTask.description }}</p>

        <div class="flex flex-col gap-2">
          <h1>
            Subtasks ({{ doneSubtasks.doneQuantity }} of
            {{ doneSubtasks.subTasks }})
          </h1>
          <ul class="flex flex-col gap-2">
            <li
              class="flex items-center gap-2 cursor-pointer"
              v-for="subTask in selectedTask.subTasks"
              :key="subTask.id"
              @click="() => changeSubtaskStatus(subTask.id)"
            >
              <div
                class="bg-[#E4EBFA] flex items-center w-full gap-3 p-2 rounded-lg"
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
              </div>
            </li>
          </ul>
        </div>

        <div class="mt-4">
          <label for="status" class="block text-sm font-medium text-gray-700"
            >Status</label
          >
          <div
            id="status"
            @click.self="toggleDropdown"
            class="border rounded p-2 outline-none cursor-pointer relative"
          >
            <div>{{ readableStatus }}</div>
            <div
              :class="statusDropdownActive ? 'max-h-[150px]' : 'max-h-0'"
              class="absolute left-0 top-[50px] overflow-hidden w-full bg-white border rounded shadow-lg transition-all"
            >
              <h1
                v-for="status in statuses"
                :key="status.value"
                @click.stop="selectStatus(status.value)"
              >
                {{ status.text }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<style scoped></style>

<style scoped></style>

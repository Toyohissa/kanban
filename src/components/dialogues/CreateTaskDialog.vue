<script setup lang="ts">
import { computed, ref } from "vue";
import BaseDialogue from "../base/BaseDialog.vue";
import { useBoardStore } from "../../pinia/board.pinia";
import { ISubtask } from "../../ts/board.types";

const useBoard = useBoardStore();
const dialogActive = ref<boolean>(false);

const dialogActivate = () => {
  dialogActive.value = true;
};

const subTasks = ref<ISubtask[]>([]);
const title = ref<string>("");
const description = ref<string>("");
const titleError = ref<string>("");
const descriptionError = ref<string>("");
const subTaskErrors = ref<string[]>([]);

const allBoards = computed(() => {
  return useBoard.getAllBoards;
});

const selectedBoardId = computed(() => {
  const selectedBoard = allBoards.value.find((e) => e.selected === true);
  console.log("Selected Board:", selectedBoard);
  return selectedBoard ? selectedBoard.id : null;
});

const handleSubmit = () => {
  titleError.value = title.value ? "" : "Field cannot be empty";
  descriptionError.value = description.value ? "" : "Field cannot be empty";
  subTaskErrors.value = subTasks.value.map((subtask) =>
    subtask.title ? "" : "Field cannot be empty"
  );

  if (
    titleError.value ||
    descriptionError.value ||
    subTaskErrors.value.some((error) => error)
  ) {
    console.error("Validation failed");
    return;
  }

  const boardId = selectedBoardId.value;
  console.log("Selected Board ID:", boardId);
  if (boardId !== null) {
    try {
      useBoard.addTodo(boardId, title.value, description.value, subTasks.value);
      dialogActive.value = false;
      title.value = "";
      description.value = "";
      subTasks.value = [];
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  } else {
    console.error("No board selected");
  }
};
</script>

<template>
  <div>
    <h1
      v-if="selectedBoardId"
      class="px-4 py-2 rounded-lg bg-white shadow-xl cursor-pointer hover:scale-105 hover:bg-[#635fc7] hover:text-white transition-all"
      @click="dialogActivate"
    >
      Add Task
    </h1>
    <BaseDialogue :closeable="true" title="Add Todo" v-model="dialogActive">
      <div
        class="w-[400px] bg-white p-5 rounded-t-lg h-[500px] flex flex-col gap-5 overflow-y-scroll"
      >
        <div class="w-full">
          <h1>Title</h1>
          <input v-model="title" type="text" class="w-full" />
          <p v-if="titleError" class="text-red-500">{{ titleError }}</p>
        </div>
        <div>
          <h1>Description</h1>
          <input v-model="description" type="text" class="w-full" />
          <p v-if="descriptionError" class="text-red-500">
            {{ descriptionError }}
          </p>
        </div>
        <div class="flex flex-col gap-5">
          <h1>Subtasks</h1>
          <div class="flex flex-col" v-for="(subtask, index) in subTasks">
            <div class="flex items-center gap-2">
              <input v-model="subtask.title" type="text" class="w-full" />
              <i
                @click="() => subTasks.splice(index, 1)"
                class="fa-solid fa-xmark cursor-pointer"
                style="color: #ff0000"
              ></i>
            </div>
            <p v-if="subTaskErrors[index]" class="text-red-500">
              {{ subTaskErrors[index] }}
            </p>
          </div>
          <button
            @click="subTasks.push({ title: '', status: false, id: Date.now() })"
            class="w-full text-sm rounded-r-full hover:text-white transition-all py-2 rounded-l-full bg-[#a8a4ff]"
          >
            Create a new Subtask
          </button>
        </div>
      </div>
      <button
        @click="handleSubmit"
        class="w-full text-sm rounded-b-lg hover:text-white transition-all py-2 bg-[#a8a4ff]"
      >
        Submit
      </button>
    </BaseDialogue>
  </div>
</template>

<style scoped>
input {
  outline: none;
  color: black;
  padding: 0.75rem 1rem;
  border: 1px solid blueviolet;
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import BaseDialogue from "../base/BaseDialog.vue";
import { useBoardStore } from "../../pinia/board.pinia";

const useBoard = useBoardStore();
const dialogActive = ref<boolean>(false);

const dialogActivate = () => {
  dialogActive.value = true;
};
const subTasks = ref<string[]>([]);
const title = ref<string>("");
const description = ref<string>("");
const id = useBoard.getAllBoards.find((el) => el.selected === true)?.id;
</script>
<template>
  <div>
    <h1 @click="dialogActivate">Add Task</h1>
    <BaseDialogue :closeable="true" title="Add Todo" v-model="dialogActive">
      <div
        class="w-[400px] bg-white p-5 rounded-lg h-[500px] flex flex-col gap-5 overflow-y-scroll"
      >
        <div class="w-full">
          <h1>Title</h1>
          <input v-model="title" type="text" class="w-full" />
        </div>
        <div>
          <h1>Description</h1>
          <input v-model="description" type="text" class="w-full" />
        </div>
        <div class="flex flex-col gap-5">
          <h1>Subtasks</h1>
          <div
            class="flex items-center gap-2"
            v-for="(subTask, index) in subTasks"
          >
            <input v-model="subTasks[index]" type="text" class="w-full" />
            <i
              @click="() => subTasks.splice(index, 1)"
              class="fa-solid fa-xmark cursor-pointer"
              style="color: #ff0000"
            ></i>
          </div>
          <button
            @click="subTasks.push('')"
            class="w-full text-sm rounded-r-full hover:text-white transition-all py-2 rounded-l-full bg-[#a8a4ff]"
          >
            Create a new Subtask
          </button>
        </div>
      </div>
      <button
        @click="useBoard.addTodo(id, title, description, subTasks)"
        class="w-full text-sm rounded-r-full hover:text-white transition-all py-2 rounded-l-full bg-[#a8a4ff]"
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

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { useBoardStore } from "../pinia/board.pinia";

const useBoard = useBoardStore();
const newBoard = ref<string>("");
const boardIsBeingCreated = ref<boolean>(false);

const addBoard = () => {
  if (newBoard.value === "") {
    boardIsBeingCreated.value = false;
    return;
  }
  const trimmedBoardName = newBoard.value.trim();
  useBoard.addBoard(trimmedBoardName);
  newBoard.value = "";
  boardIsBeingCreated.value = false;
};

const boardsToRender = computed(() => {
  return useBoard.getAllBoards;
});

const focusInput = ref<HTMLInputElement | null>(null);

const onBoardCreateClick = async () => {
  boardIsBeingCreated.value = true;
  await nextTick();
  if (focusInput.value) {
    focusInput.value.focus();
  }
};
</script>

<template>
  <div
    class="w-[300px] bg-white h-screen overflow-y-scroll flex-shrink-0 pr-4 py-2 text-gray-500"
  >
    <h1 class="pl-4 py-3">ALL BOARDS</h1>
    <div :key="Math.random()" v-for="board in boardsToRender" class="mb-1">
      <h1
        @click="() => useBoard.changeBoard(board.id)"
        :class="board.selected === true ? 'bg-[#635fc7] text-white' : ''"
        class="hover:text-white pl-4 rounded-r-full py-3 hover:bg-[#635fc7] cursor-pointer transition-all"
      >
        {{ board.name }}
      </h1>
    </div>
    <h2
      @click="onBoardCreateClick"
      v-if="!boardIsBeingCreated"
      class="cursor-pointer w-fit hover:scale-110 py-3 transition-all pl-4 text-[#635fc7]"
    >
      + Create New Board
    </h2>

    <div
      v-else
      class="py-3 px-4 border flex items-center rounded-r-full justify-between border-[#635fc7]"
    >
      <input
        class="outline-none text-black"
        v-model="newBoard"
        @keyup.enter="addBoard"
        type="text"
        ref="focusInput"
      />
      <div class="flex items-center gap-2">
        <i
          @click="addBoard"
          class="fa-solid fa-plus cursor-pointer"
          style="color: #635fc7"
        ></i>
        <i
          @click="
            () => {
              newBoard = '';
              boardIsBeingCreated = false;
            }
          "
          class="fa-solid fa-xmark cursor-pointer"
          style="color: #ff0000"
        ></i>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

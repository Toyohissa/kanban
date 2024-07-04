<script setup lang="ts">
import { computed, ref } from "vue";
import BaseDialog from "../base/BaseDialog.vue";
import { useBoardStore } from "../../pinia/board.pinia";

const useBoard = useBoardStore();
const dialogActive = ref<boolean>(false);

const allBoards = computed(() => {
  return useBoard.getAllBoards;
});

const selectedBoardId = computed(() => {
  const selectedBoard = allBoards.value.find((e) => e.selected === true);
  console.log("Selected Board:", selectedBoard);
  return selectedBoard ? selectedBoard.id : null;
});

const deleteBoard = () => {
  if (!selectedBoardId.value) return;

  useBoard.deleteBoard(selectedBoardId.value);

  dialogActive.value = false;
};
</script>

<template>
  <div v-if="selectedBoardId">
    <button
      @click="dialogActive = true"
      class="bg-red-500 text-white py-2 px-4 w-fit rounded-lg hover:scale-105 transition-all hover:bg-red-700"
    >
      Delete Board
    </button>
    <BaseDialog :closeable="false" title="Delete Board" v-model="dialogActive">
      <div
        class="w-[400px] bg-white p-5 rounded-t-lg h-fit flex flex-col gap-5"
      >
        <h1>Do you want to delete this board?</h1>
        <div class="w-full flex items-center justify-between">
          <button
            @click="dialogActive = false"
            class="bg-red-500 text-white py-2 px-4 w-fit rounded hover:bg-red-700"
          >
            No
          </button>
          <button
            @click="deleteBoard"
            class="bg-green-500 text-white py-2 px-4 w-fit rounded hover:bg-green-700"
          >
            Yes
          </button>
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<style scoped></style>

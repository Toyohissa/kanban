<script setup lang="ts">
import BoardSidebarComponent from "./components/BoardSidebarComponent.vue";
import BoardComponent from "./components/BoardComponent.vue";
</script>

<template>
  <div class="bg-[#e3ebfa] flex gap-2 overflow-hidden">
    <BoardSidebarComponent></BoardSidebarComponent>
    <div id="fixed-components" class="w-full">
      <BoardComponent></BoardComponent>
    </div>
  </div>
</template>

<style scoped></style>

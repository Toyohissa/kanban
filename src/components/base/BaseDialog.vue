<script lang="ts" setup>
const props = defineProps<{
  title: string;
  closeable: boolean;
}>();
const dialogActive = defineModel<boolean>({ default: false });

function closeDialog() {
  dialogActive.value = false;
}
</script>

<template>
  <transition>
    <div
      v-if="dialogActive"
      class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen pointer-events-auto"
    >
      <div
        class="fixed w-screen h-screen bg-black/30 z-10"
        @click="closeDialog"
      />
      <div
        class="bg-card rounded-lg overflow-hidden p-6 flex flex-col w-fit relative z-20"
      >
        <div class="flex justify-between items-center pb-6">
          <h2 class="text-white font-bold text-lg">{{ props.title }}</h2>
          <div
            v-if="closeable"
            class="w-8 h-8 hover:bg-white/20 rounded-full cursor-pointer flex justify-center items-center"
            @click="closeDialog"
          >
            <i class="fa-solid fa-xmark text-white" />
          </div>
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<!-- src/components/Toast.vue -->
<template>
  <Transition name="toast">
    <div 
      v-if="toastMessage" 
      class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full shadow-lg font-medium text-sm z-50 flex items-center gap-2 whitespace-nowrap"
    >
      {{ toastMessage }}
    </div>
  </Transition>
</template>

<script setup>
import { toastMessage } from '../store/store';
</script>

<style scoped>
/* Animaciones suaves para que el Toast suba y baje */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.9);
}
</style>
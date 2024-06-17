<template>
  <div class="kk-scrollbar">
    <div class="kk-scrollbar-dot top"></div>
    <div class="kk-scrollbar-inner" :style="{ top: `${clampedScrollPercent - 1}%` }"></div>
    <div class="kk-scrollbar-dot bottom"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/mainStore';

const playerStore = useMainStore();

const scrollPercent = computed(() => playerStore.scrollPercent);
const clampedScrollPercent = computed(() => {
  return Math.min(93, Math.max(0, scrollPercent.value));
});
</script>

<style scoped>
.kk-scrollbar {
  position: absolute;
  background-color: #4a4b9a;
  width: 6px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.kk-scrollbar-inner {
  position: absolute;
  background-color: #bae3d2;
  width: 10px;
  height: 8%;
  border-radius: 10px;
  z-index: 100;
}

.kk-scrollbar-dot {
  width: 10px;
  height: 10px;
  background-color: #4a4b9a;
  border-radius: 50%;
  z-index: 99;
}

.kk-scrollbar-dot.top {
  position: absolute;
  top: 0;
}

.kk-scrollbar-dot.bottom {
  position: absolute;
  bottom: 0;
}
</style>
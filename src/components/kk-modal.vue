<template>
  <div class="kk-modal-wrapper">
    <div class="kk-modal-overlay"></div>
    <transition name="modal-pop">
      <div v-show="showDialog" class="kk-modal" @click="setModalDisplay">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
import { computed, ref, onMounted } from 'vue'

const store = useMainStore();
const isModalVisible = computed(() => store.modalDisplay !== '');
const showDialog = ref(false);

function setModalDisplay() {
  store.setModalDisplay('');
}

onMounted(() => {
  if (isModalVisible.value) {
    setTimeout(() => {
      showDialog.value = true;
    }, 100);
  }
});
</script>

<style scoped>
.kk-modal-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/kk-modal/dot.png') repeat;
  z-index: 1000;
}

.kk-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.4);
  z-index: 999;
}

.kk-modal {
  width: 600px;
  height: 50vh;
  background: url('@/assets/img/kk-modal/content-bubble.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1200;
}

.modal-pop-enter-active, .modal-pop-leave-active {
  transition: transform 0.1s ease-in-out;
}

.modal-pop-enter-from {
  transform: scale(1.05);
}

.modal-pop-enter-to {
  transform: scale(1);
}

.modal-pop-leave-from {
  transform: scale(1);
}

.modal-pop-leave-to {
  transform: scale(1.05);
}
</style>
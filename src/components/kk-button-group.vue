<template>
  <div v-if="ready" class="kk-button-group">
    <div class="kk-button button" @click="toggleShuffle">
      <div class="kk-button-icon">A</div>
      <div v-if="!isShuffle" class="kk-button-text">{{ getText('shuffle', lang) }}</div>
      <div v-else class="kk-button-text">{{ getText('loop', lang) }}</div>
    </div>
    <div class="kk-button button" @click="toggleLanguage">
      <div class="kk-button-icon">B</div>
      <div class="kk-button-text">{{ getText('language', lang) }}</div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
import { computed, onMounted, onUnmounted } from 'vue';
import { getText } from '@/utils/i18n';


const isShuffle = computed(() => {
  return useMainStore().isShuffle;
});

const lang = computed(() => {
  return useMainStore().lang;
});

const ready = computed(() => {
  return useMainStore().playList.length > 0;
});

const toggleShuffle = () => {
  const store = useMainStore();
  store.setShuffle(!store.isShuffle);
  if (store.isShuffle) {
    console.log('开始播放');
  } else {
    console.log('停止播放');
  }
};

const toggleLanguage = () => {
  const store = useMainStore();
  if (store.lang === 'zh') {
    store.setLang('jp');
  } else if (store.lang === 'jp') {
    store.setLang('en');
  } else {
    store.setLang('zh');
  }
};

const handleKeydown = (event) => {
  if (event.key === 'a' || event.key === 'A') {
    toggleShuffle();
  } else if (event.key === 'b' || event.key === 'B') {
    toggleLanguage();
  }
};

onMounted(() => {
  const store = useMainStore();
  window.addEventListener('keydown', handleKeydown);
  if (localStorage.getItem('lang')) {
    store.setLang(localStorage.getItem('lang'));
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

</script>

<style scoped>
.kk-button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

@media screen and (max-width: 700px) {
  .kk-button-group {
    flex-direction: column;
    height: 90px;
    width: 120px;
  }
}

.kk-button {
  display: flex;
  align-items: center;
  background: url('@/assets/img/kk-button-group/button.png') no-repeat center center / 100% 100%;
  padding: 0 10px;
  height: 40px;
  margin-left: 10px;
  transition: transform 0.2s ease;
}

.kk-button:hover {
  transform: scale(1.05);
}

.kk-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #887964;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  width: 25px;
  height: 23px;
  border-radius: 50%;
  padding-top: 3px;
  margin-right: 5px;
}

.kk-button-text {
  color: #887964;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding-top: 3px;
}
</style>
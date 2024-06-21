<template>
  <div class="kk-button-group">
    <div class="kk-button button" @click="toggleShuffle">
      <div class="kk-button-icon" :style="{ backgroundImage: `url(${isShuffle ? loopIcon : shuffleIcon})` }"></div>
      <div v-if="!isShuffle" class="kk-button-text">{{ getText('shuffle', lang) }}</div>
      <div v-else class="kk-button-text">{{ getText('loop', lang) }}</div>
    </div>
    <div class="kk-button button" @click="toggleLanguage">
      <div class="kk-button-icon" :style="{ backgroundImage: `url(${langIcon})` }"></div>
      <div class="kk-button-text">{{ getText('language', lang) }}</div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore'
import { computed, onMounted } from 'vue';
import { getText } from '@/utils/i18n';
import shuffleIcon from '@/assets/img/kk-button-group/shuffle.png';
import loopIcon from '@/assets/img/kk-button-group/loop.png';
import langIcon from '@/assets/img/kk-button-group/lang.png';

const isShuffle = computed(() => {
  return useMainStore().isShuffle;
});

const lang = computed(() => {
  return useMainStore().lang;
});

const toggleShuffle = () => {
  const store = useMainStore();
  store.setShuffle(!store.isShuffle);
  if (store.isShuffle && !store.isPlaying) {
    const index = Math.floor(Math.random() * store.playList.length);
    store.setSelectedIndex(index);
  }
  if (!store.isShuffle) {
    store.setSelectedIndex(-1);
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

onMounted(() => {
  const store = useMainStore();
  if (localStorage.getItem('lang')) {
    store.setLang(localStorage.getItem('lang'));
  }
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
  width: 25px;
  height: 23px;
  background-size: contain;
  background-repeat: no-repeat;
}

.kk-button-text {
  color: #887964;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin: 0 8px;
  padding-top: 3px;
}
</style>
<template>
  <Status class="status" />
  <KkPlayerCore class="kk-player-core" />
  <div class="main">
    <div class="container">
      <CdAdd class="kk-cd-add" />
      <KkCd v-for="(cd, index) in cdList" :key="index" :config="{ name: cd.name.zh, coverImg: cd.coverImg, index }"
        class="kk-cd" />
    </div>
  </div>
  <Background class="background" />
</template>

<script>

import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue'

import Background from './components/kk-background.vue'
import Status from './components/kk-status.vue'
import KkPlayerCore from './components/kk-player-core.vue'
import CdAdd from './components/kk-cdAdd.vue'
import KkCd from './components/kk-cd.vue'

export default {
  components: {
    Background,
    Status,
    KkPlayerCore,
    CdAdd,
    KkCd
  },
  setup() {
    const playerStore = usePlayerStore();
    const isPlaying = computed(() => playerStore.isPlaying);
    const cdList = computed(() => playerStore.playList);

    return {
      isPlaying,
      cdList
    }
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.status {
  position: absolute;
  top: 2vw;
  left: 3vw;
}

.kk-player-core {
  position: absolute;
  top: 2vw;
  right: 3vw;
}

@media screen and (max-width: 700px) {
  .kk-player-core {
    position: absolute;
    bottom: 6vw;
    left: 4vw;
    top: auto;
    right: auto;
  }
}

.main {
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: 75vh;
}

@media (max-width: 860px) {
  .main {
    top: 15vw;
  }
}

.container {
  padding-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.container::-webkit-scrollbar {
  display: none;
}

.kk-cd-add,
.kk-cd {
  color: white;
  width: 100%;
  padding-top: 100%;
}

@media (min-width: 1200px) {
  .container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 600px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
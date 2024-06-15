<template>
  <button style="position: absolute; top: 0; left: 0; z-index: 1000;" @click="togglePlaying">{{ isPlaying ? 'Stop' : 'Start' }}</button>
  <Status class="status" />
  <div class="main">
    <div class="container">
      <CdAdd class="kk-cd-add" />
      <KkCd v-for="(cd, index) in cdList" :key="index" :config="{name: cd.name, coverImg: cd.coverImg}" class="kk-cd"/>    
    </div>
  </div>
  <Background class="background" />
</template>

<script>
import axios from 'axios';
import { usePlayerStore } from '@/stores/index'
import { computed, ref, onMounted } from 'vue'

import { LIST_URL } from "@/config/config";

import Background from './components/kk-background.vue'
import Status from './components/kk-status.vue'
import CdAdd from './components/kk-cdAdd.vue'
import KkCd from './components/kk-cd.vue'

export default {
  components: {
    Background,
    Status,
    CdAdd,
    KkCd
  },
  setup() {
    const playerStore = usePlayerStore();
    const isPlaying = computed(() => playerStore.isPlaying);
    const cdList = ref([]);

    const togglePlaying = () => {
      playerStore.setPlaying(!playerStore.isPlaying);
      playerStore.setTrack('K.K.啦啦啦啦啦');
    };

    const fetchCdList = async () => {
      try {
        const response = await axios.get(LIST_URL);
        cdList.value = response.data;
      } catch (error) {
        console.error('Error fetching CD list:', error);
      }
    };

    onMounted(() => {
      fetchCdList();
    });

    return {
      isPlaying,
      togglePlaying,
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
  margin: 2vw 0 0 3vw;
}

.main {
  position: absolute;
  top: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: 75vh;
}

.container {
  margin-top: 16px;
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

.kk-cd-add, .kk-cd {
  color: white;
  width: 100%;
  padding-top: 100%;
}

@media (min-width: 1200px) {
  .container {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
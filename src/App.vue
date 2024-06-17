<template>
  <Status class="status" />
  <KkPlayerCore class="kk-player-core" />
  <div class="main">
    <div class="container" ref="container">
      <CdAdd class="kk-cd-add" />
      <KkCd v-for="(cd, index) in cdList" :key="index" :config="{ name: cd.name[lang], coverImg: cd.coverImg, index }"
        class="kk-cd" />
    </div>
    <div class="kk-scrollbar-wrapper">
      <KkScrollbar class="kk-scrollbar" />
    </div>
  </div>
  <KkButtonGroup class="kk-button-group" />
  <Background class="background" />
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

import Background from './components/kk-background.vue'
import Status from './components/kk-status.vue'
import KkPlayerCore from './components/kk-player-core.vue'
import CdAdd from './components/kk-cdAdd.vue'
import KkCd from './components/kk-cd.vue'
import KkScrollbar from './components/kk-scrollbar.vue'
import KkButtonGroup from './components/kk-button-group.vue'

export default {
  components: {
    Background,
    Status,
    KkPlayerCore,
    CdAdd,
    KkCd,
    KkScrollbar,
    KkButtonGroup
  },
  setup() {
    const store = useMainStore();
    const isPlaying = computed(() => store.isPlaying);
    const cdList = computed(() => store.playList);
    const container = ref(null);

    const lang = computed(() => {
      return useMainStore().lang;
    });

    const handleScroll = () => {
      const scrollTop = container.value.scrollTop;
      const scrollHeight = container.value.scrollHeight - container.value.clientHeight;
      const scrollPercent = ((scrollTop / scrollHeight) * 100).toFixed(2);
      store.setScrollPercent(scrollPercent);
    };

    onMounted(() => {
      container.value.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      container.value.removeEventListener('scroll', handleScroll);
    });

    return {
      isPlaying,
      cdList,
      container,
      lang
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

.kk-scrollbar-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: -3vw;
  width: 8px;
  height: 100vh;
  pointer-events: none;
}

.kk-scrollbar {
  height: 60vh;
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

.kk-button-group {
  position: absolute;
  bottom: 2vw;
  right: 3vw;
}

.main {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: calc(100vh - 24vh);
}

.container {
  padding-top: 12vh;
  padding-bottom: 12vh;
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
  overflow-x: hidden
}

@media screen and (max-width: 700px) {
  .kk-player-core {
    bottom: 6vw;
    left: 4vw;
    top: auto;
    right: auto;
  }

  .kk-button-group {
    bottom: 6vw;
    right: 4vw;
  }

  .main {
    height: calc(100vh - 34vh);
  }

  .container {
    padding-bottom: 22vh;
  }
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
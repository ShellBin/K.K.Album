<template>
  <div class="kk-status-container">
    <div class="jelly"></div>
    <div class="kk-status-content">
      <div style="display: flex; align-items: center;">
        <div class="icon-area">
          <div v-if="!isShuffle" class="note icon" :class="{ note2: !isPlaying, bounce: isBouncing }"></div>
          <div v-if="isShuffle" class="shuffle icon" :class="{ shuffle_bounce: isBouncing }"></div>
        </div>
        <div v-show="isPlaying" class="status-text fade">
          <span v-for="(char, index) in trackName" :key="index" :style="{ animationDelay: `${(index + 1) * 0.18}s` }"
            :class="{ bounce: isBouncing }">{{ char }}</span>
        </div>
      </div>
      <div class="volume-area">
        <div class="icon icon-adjust button" :class="[volumeDownClass, buttonClickClass === 'button-click-animation-decrease' ? 'button-click-animation' : '']" @click="handleDecreaseVolume"></div>
        <div class="icon volume-icon" :style="volumeIconStyle"></div>
        <div class="icon icon-adjust button" :class="[volumeUpClass, buttonClickClass === 'button-click-animation-increase' ? 'button-click-animation' : '']" @click="handleIncreaseVolume"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from '@/stores/player'
import { watch } from 'vue'

import volume0 from '@/assets/img/kk-status/icon-volume-1.svg';
import volume1 from '@/assets/img/kk-status/icon-volume-2.svg';
import volume2 from '@/assets/img/kk-status/icon-volume-3.svg';
import volume3 from '@/assets/img/kk-status/icon-volume-4.svg';

export default {
  name: 'KK-Status',
  data() {
    return {
      isPlaying: false,
      isShuffle: false,
      trackName: '',
      isBouncing: false,
      volume: localStorage.getItem('volume') || 3,
      volumeIcons: [ volume0, volume1, volume2, volume3 ],
      buttonClickClass: ''
    }
  },
  computed: {
    volumeDownClass() {
      return {
        'icon': true,
        'icon-down-actived': this.volume > 0,
        'icon-down-disable': this.volume <= 0
      }
    },
    volumeUpClass() {
      return {
        'icon': true,
        'icon-add-actived': this.volume < 3,
        'icon-add-disable': this.volume >= 3
      }
    },
    volumeIconStyle() {
      return {
        backgroundImage: `url(${this.volumeIcons[this.volume]})`
      }
    }
  },
  mounted() {
    const playerStore = usePlayerStore();
    this.setDefaultVolume();
    // 监听当前播放歌曲变化
    watch(() => playerStore.trackName, (val) => {
      this.trackName = val
    }),
    // 监听播放状态变化
    watch(() => playerStore.isPlaying, (val) => {
      this.isPlaying = val
      if (val) {
        setTimeout(() => { this.triggerBounce() }, 300);
        this.bounceInterval = setInterval(() => {
          if (!this.isBouncing) {
            this.triggerBounce()
          }
        }, 5000);
      } else {
        clearInterval(this.bounceInterval)
      }
    }),
    // 监听是否打乱
    watch(() => playerStore.isShuffle, (val) => {
      this.isShuffle = val
    })
  },

  methods: {
    triggerBounce() {
      this.isBouncing = true;
      setTimeout(() => {
        this.isBouncing = false;
      }, 300 * this.trackName.length);
    },
    handleIncreaseVolume() {
      this.increaseVolume();
      this.triggerVolumeClick('increase');
    },
    handleDecreaseVolume() {
      this.decreaseVolume();
      this.triggerVolumeClick('decrease');
    },
    increaseVolume() {
      if (this.volume < 3) {
        this.volume++;
      }
    },
    decreaseVolume() {
      if (this.volume > 0) {
        this.volume--;
      }
    },
    setDefaultVolume() {
      this.volume = localStorage.getItem('volume') || 3;
      localStorage.setItem('volume', this.volume);
    },
    triggerVolumeClick(type) {
      const playerStore = usePlayerStore();
      localStorage.setItem('volume', this.volume);
      playerStore.setVolume(this.volume);
      if (type === 'increase') {
        this.buttonClickClass = 'button-click-animation-increase';
      } else {
        this.buttonClickClass = 'button-click-animation-decrease';
      }
      setTimeout(() => {
        this.buttonClickClass = '';
      }, 200);
    }
  }
}
</script>

<style scoped>
.kk-status-container {
  z-index: 100;
  position: relative;
  overflow: visible;
  color: #07BDAA;
}

.kk-status-content {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0 0 20px;
  min-width: 48vw;
  width: 48vw;
  max-width: 48vw;
}

.jelly {
  height: 50px;
  background-image: url('@/assets/img/kk-status/status-bg.png');
  position: absolute;
  z-index: -1;
  min-width: 47vw;
  width: 51.8vw;
  max-width: 60vw;
}

.status-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  line-height: 35px;
  font-weight: 550;
  margin-left: 20px;
}

.status-text span {
  display: inline-block;
  height: 35px;
}

@media (max-width: 700px) {
  .status-text {
    font-size: 18px;
  }

  .kk-status-content {
    min-width: 80vw;
  }

  .jelly {
    min-width: 90vw;
    width: 90vw;
  }
}

.icon-area {
  width: 35px;
  height: 35px;
}

.icon {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.note {
  background-image: url('@/assets/img/kk-status/icon-note.svg');
  width: 35px;
  height: 35px;
}

.note2 {
  background-image: url('@/assets/img/kk-status/icon-note2.svg') !important;
}

.shuffle {
  background-image: url('@/assets/img/kk-status/icon-shuffle.svg');
  width: 35px;
  height: 35px;
}

.bounce {
  will-change: transform;
  display: inline-block;
  animation: bounce 0.8s ease;
  animation-fill-mode: both;
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
}

@keyframes bounce {
  0% {
    transform: scaleY(1);
  }

  20% {
    transform: scaleY(1.3);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(2px);
  }

  100% {
    transform: translateY(0);
  }
}

.shuffle_bounce {
  will-change: transform;
  display: inline-block;
  animation: shuffle_bounce 0.8s ease;
  animation-fill-mode: both;
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
}

@keyframes shuffle_bounce {
  0% {
    transform: scaleX(1);
  }

  20% {
    transform: scaleX(1.3);
  }

  40% {
    transform: translateX(-10px);
  }

  60% {
    transform: translateX(2px);
  }

  100% {
    transform: translateX(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.volume-area {
  display: flex;
  align-items: center;
}

.icon-adjust {
  width: 20px;
  height: 20px;
}

.volume-icon {
  margin: 0 10px;
  width: 36px;
  height: 27px;
}

.icon-down-actived {
  background-image: url('@/assets/img/kk-status/icon-down-actived.svg');
}

.icon-down-disable {
  background-image: url('@/assets/img/kk-status/icon-down-disable.svg');
}

.icon-add-actived {
  background-image: url('@/assets/img/kk-status/icon-add-actived.svg');
}

.icon-add-disable {
  background-image: url('@/assets/img/kk-status/icon-add-disable.svg');
}
</style>
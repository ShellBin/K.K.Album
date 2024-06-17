<template>
  <div class="kk-player-core">
    <div class="switch-group">
      <div class="live icon button" :class="{ active: mode === 'live', 'show-bubble': showBubble === 'live', }"
        @mouseover="showBubble = 'live'" @mouseout="showBubble = ''" @click="toggleMode('live')">
        <div class="bubble-text">{{ getText('kkSong', lang) }}</div>
      </div>
      <div class="music-box icon button"
        :class="{ active: mode === 'music_box', 'show-bubble': showBubble === 'music_box', }"
        @mouseover="showBubble = 'music_box'" @mouseout="showBubble = ''" @click="toggleMode('music_box')">
        <div class="bubble-text">{{ getText('musicBox', lang) }}</div>
      </div>
      <div class="aircheck icon button"
        :class="{ active: mode === 'aircheck', 'show-bubble': showBubble === 'aircheck', }"
        @mouseover="showBubble = 'aircheck'" @mouseout="showBubble = ''" @click="toggleMode('aircheck')">
        <div class="bubble-text">{{ getText('cd', lang) }}</div>
      </div>
    </div>
    <div class="about-group">
      <div class="dot"></div>
      <div class="about active icon button" :class="{ 'show-bubble': showBubble === 'about', }"
        @mouseover="showBubble = 'about'" @mouseout="showBubble = ''">
        <div class="bubble-text">{{ getText('about', lang) }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import Player from '@/utils/player';
import { useMainStore } from '@/stores/mainStore';
import { getText } from '@/utils/i18n';
import listData from '@/config/list.json';

import { SONGS_FILES_URL } from "@/config/config";

const volumeMapping = [0, 0.33, 0.66, 1];

export default {
  data() {
    return {
      mode: localStorage.getItem('mode') || 'live',
      lang: '',
      // 下载的完整列表
      listData: [],
      player: null,
      showBubble: '',
    };
  },

  mounted() {
    this.fetchPlayList();
    this.createRandomGroup();
  },

  created() {
    const store = useMainStore();

    // 确保已设置音量和语言
    if (!localStorage.getItem('volume')) {
      localStorage.setItem('volume', 3);
    }
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'zh');
    } else {
      this.lang = localStorage.getItem('lang');
    }

    // 监听 store 中 selectedIndex 的变化,响应切歌
    this.$watch(() => store.selectedIndex, (newIndex) => {
      this.mainPlayerControl(newIndex);
    });

    // 监听 store 中 volume 的变化,响应音量变化
    this.$watch(() => store.volume, (newVolume) => {
      if (this.player) {
        this.player.setVolume(volumeMapping[newVolume]);
      }
    });

    // 监听 store 中 lang 的变化
    this.$watch(() => store.lang, (newLang) => {
      this.lang = newLang;
      this.createRandomGroup();
      if (store.isPlaying) {
        store.setTrack(this.listData[store.playingIndex].name[store.lang]);
      }
    });
  },

  methods: {

    getText(key, lang) {
      return getText(key, lang);
    },

    // 切换播放模式
    toggleMode(mode) {
      const store = useMainStore();
      store.setShuffle(false);
      this.mode = mode;
      localStorage.setItem('mode', mode);
      this.updateAlbumList();
      this.stopPlayer();
      if (mode === 'live') {
        this.createRandomGroup();
      }
    },

    // 获取播放总列表
    fetchPlayList() {
      this.listData = listData;
      this.updateAlbumList();
    },

    // 更新可用的播放列表
    updateAlbumList() {
      const store = useMainStore();
      const filteredList = this.listData
        .filter(item => item.song[this.mode])
        .map(item => ({
          name: item.name,
          coverImg: item.coverImg
        }));
      store.setPlayList(filteredList);
    },

    // 创建四个互相不一样的随机数，要求范围在0-3
    createRandomGroup() {
      const store = useMainStore();
      const randomGroup = [];
      while (randomGroup.length < 4) {
        const randomNum = Math.floor(Math.random() * 4);
        if (!randomGroup.includes(randomNum)) {
          randomGroup.push(randomNum);
        }
      }
      store.setRandomGroup(randomGroup);
    },

    // 主播放控制
    mainPlayerControl(newIndex) {
      const store = useMainStore();
      const lang = store.lang;
      // 仅允许单例
      if (!this.player) {
        this.player = new Player();
        this.player.addEventListener('audioEnded', () => {
          if (store.isShuffle) {
            const randomIndex = Math.floor(Math.random() * store.playList.length);
            this.player.stop();
            store.setSelectedIndex(randomIndex);
          }
        });
      }
      this.player.setVolume(volumeMapping[localStorage.getItem('volume')]);
      if (newIndex !== -1) {
        // 播放控制逻辑
        this.player.stop();
        store.setPlaying(true);
        store.setTrack(getText('loading', lang));
        const url = `${SONGS_FILES_URL}/${this.listData[newIndex].song[this.mode].file}`;
        this.player.load(url,
          this.listData[newIndex].song[this.mode].loopStart,
          this.listData[newIndex].song[this.mode].loopEnd
        )
          .then(() => {
            store.setTrack(this.listData[newIndex].name[store.lang]);
            store.setPlayingIndex(newIndex);
            this.player.play();
          })
          .catch((error) => {
            store.setPlaying(false);
            store.setPlayingIndex(-1);
            store.setTrack(getText('errorFetchingAudio', lang));
            console.error('Error fetching audio:', error);
          });
      } else {
        this.stopPlayer();
      }
    },

    // 中断播放
    stopPlayer() {
      if (this.player) {
        this.player.stop();
      }
      const store = useMainStore();
      store.setPlaying(false);
      store.setPlayingIndex(-1);
      store.setSelectedIndex(-1);
      store.setTrack('');
    }
  },
};
</script>

<style scoped>
.kk-player-core {
  width: 190px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-image: url('@/assets/img/kk-player-core/core_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 100;
}

.switch-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
}

.about-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35%;
}

.dot {
  margin-left: 15px;
  width: 2px;
  height: 10px;
  border-radius: 50%;
  background-color: #95b5c4;
}

.icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 0.2s ease;
}

.bubble-text {
  background-image: url('@/assets/img/public/bubble.png');
  top: -28px;
  font-size: 1.1rem;
  padding: 0.4vw 0.6vw;
}

@media screen and (max-width: 400px) {
  .kk-player-core {
    width: 170px;
    height: 50px;
    padding: 0 20px;
  }
}

.icon.show-bubble .bubble-text {
  opacity: 1;
}

.icon:active {
  animation: button-click 0.2s ease;
}

.icon:hover {
  transform: scale(1.05);
}

.live {
  background-image: url('@/assets/img/kk-player-core/icon_kk_dim.png');
}

.live.active {
  background-image: url('@/assets/img/kk-player-core/icon_kk_active.png');
}

.music-box {
  background-image: url('@/assets/img/kk-player-core/icon_musicbox_dim.png');
}

.music-box.active {
  background-image: url('@/assets/img/kk-player-core/icon_musicbox_active.png');
}

.aircheck {
  background-image: url('@/assets/img/kk-player-core/icon_cd_dim.png');
}

.aircheck.active {
  background-image: url('@/assets/img/kk-player-core/icon_cd_active.png');
}

.about {
  background-image: url('@/assets/img/kk-player-core/icon_about_dim.png');
}

.about.active {
  background-image: url('@/assets/img/kk-player-core/icon_about_active.png');
}
</style>
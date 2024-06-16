<template>
  <div class="kk-player-core">
    <div class="switch-group">
      <div class="live icon button" :class="{ active: mode === 'live' }" @click="toggleMode('live')"></div>
      <div class="music-box icon button" :class="{ active: mode === 'music_box' }" @click="toggleMode('music_box')">
      </div>
      <div class="aircheck icon button" :class="{ active: mode === 'aircheck' }" @click="toggleMode('aircheck')">
      </div>
    </div>
    <div class="about-group">
      <div></div>
      <div class="about active icon button"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Player from '@/utils/player';
import { usePlayerStore } from '@/stores/player';
import { textLoading, textErrorFetchingAudio } from '@/utils/i18n';

import { LIST_URL, SONGS_FILES_URL } from "@/config/config";

export default {
  data() {
    return {
      mode: localStorage.getItem('mode') || 'live',
      // 下载的完整列表
      listData: [],
      player: new Player()
    };
  },

  mounted() {
    this.fetchPlayList();
  },

  created() {
    const playerStore = usePlayerStore();
    // 监听 playerStore 中 selectedIndex 的变化,响应切歌
    this.$watch(() => playerStore.selectedIndex, (newIndex) => {
      this.mainPlayerControl(newIndex);
    });

    // 监听 playerStore 中 volume 的变化,响应音量变化
    this.$watch(() => playerStore.volume, (newVolume) => {
      const volumeMapping = [0, 0.33, 0.66, 1];
      this.player.setVolume(volumeMapping[newVolume]);
    });
  },

  methods: {
    // 切换播放模式
    toggleMode(mode) {
      this.mode = mode;
      localStorage.setItem('mode', mode);
      this.updateAlbumList();
      this.pausePlayer();
    },

    // 获取播放总列表
    async fetchPlayList() {
      axios.get(LIST_URL).then(response => {
        this.listData = response.data;
        this.updateAlbumList();
      }).catch(error => {
        console.error('Error fetching CD list:', error);
      })
    },

    // 更新可用的播放列表
    updateAlbumList() {
      const playerStore = usePlayerStore();
      const filteredList = this.listData
        .filter(item => item.song[this.mode])
        .map(item => ({
          name: item.name,
          coverImg: item.coverImg
        }));
      playerStore.setPlayList(filteredList);
    },

    // 主播放控制
    mainPlayerControl(newIndex) {
      const playerStore = usePlayerStore();
      const lang = playerStore.lang;
      if (newIndex !== -1) {
        // 播放控制逻辑
        this.player.pause();
        playerStore.setPlaying(true);
        playerStore.setTrack(textLoading(lang));
        const url = `${SONGS_FILES_URL}/${this.listData[newIndex].song[this.mode].file}`;
        this.player.load(url,
          this.listData[newIndex].song[this.mode].loopStart,
          this.listData[newIndex].song[this.mode].loopEnd
        )
        .then(() => {
          playerStore.setTrack(this.listData[newIndex].name[playerStore.lang]);
          this.player.play();
          playerStore.setPlayingIndex(newIndex);
        })
        .catch((error) => {
          playerStore.setPlaying(false);
          playerStore.setPlayingIndex(-1);
          playerStore.setTrack(textErrorFetchingAudio(lang));
          console.error('Error fetching audio:', error);
        });
      } else {
        this.pausePlayer();
      }
    },

    // 中断播放
    pausePlayer() {
      const playerStore = usePlayerStore();
      this.player.pause();
      playerStore.setPlaying(false);
      playerStore.setPlayingIndex(-1);
      playerStore.setSelectedIndex(-1);
      playerStore.setTrack('');
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

.icon {
  width: 30px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 0.2s ease;
}

.icon:active {
  animation: button-click 0.2s ease;
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
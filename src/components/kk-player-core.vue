<template>
    <div class="kk-player-core">
      <div class="switch-group">
        <div class="live icon" :class="{ active: icons.live }" @click="toggleIcon('live')"></div>
        <div class="music-box icon" :class="{ active: icons.musicBox }" @click="toggleIcon('musicBox')"></div>
        <div class="aircheck icon" :class="{ active: icons.aircheck }" @click="toggleIcon('aircheck')"></div>
      </div>
      <div class="about-group">
        <div></div>
        <div class="about icon" :class="{ active: icons.about }" @click="toggleIcon('about')"></div>
      </div>
    </div>
  </template>

  <script>
  
  export default {
    data() {
      return {
        icons: {
          live: true,
          musicBox: true,
          aircheck: true,
          about: true
        }
      };
    },
    methods: {
      toggleIcon(icon) {
        this.icons[icon] = !this.icons[icon];
      }
    }
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
  }
  
  .switch-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 65%;
  }

  .about-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 35%;
  }
  
  .icon {
    width: 35px;
    height: 35px;
    background-size: cover;
    background-repeat: no-repeat;
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
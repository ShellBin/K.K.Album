<template>
  <div class="rectangle button" :class="{
  'highlight': isHighlighted,
  'show-bubble': showBubble,
  'golden-border': showBorder
  }"
  @mousedown="highlight"
  @mouseup="deHighlight"
  @mouseleave="deHighlight"

  @mouseover="showBubble = true"
  @mouseout="showBubble = false"

  @touchstart="highlight"
  @touchend="deHighlight"

  @click="toggleActive"
  :style="backgroundStyle">
    <div v-if="isHiddenAlbum" class="hidden-album">
      <span class="hidden-album-title">{{ getText('hiddenTrack', lang) }}</span>
      <span class="hidden-album-desc">{{ trackName[lang] }}</span>
    </div>
    <span class="bg bubble-text">{{ trackName[lang] }}</span>
  </div>
</template>

<script>
import { COVER_FILES_URL } from "@/config/config";
import { useMainStore } from "@/stores/mainStore";

import { getText } from '@/utils/i18n';

import defaultCover1 from "@/assets/img/kk-cd/default1.png";
import defaultCover2 from "@/assets/img/kk-cd/default2.png";
import defaultCover3 from "@/assets/img/kk-cd/default3.png";
import defaultCover4 from "@/assets/img/kk-cd/default4.png";

export default {
  name: 'KkCd',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      coverImgUrl: '', // 封面图片 URL
      index: 0, // 当前 CD 的索引
      trackName: '', // 曲目名称
      showBubble: false, // 是否显示气泡
      showBorder: false, // 是否显示边框
      isHighlighted: false, // 是否高亮
      isHiddenAlbum: false, // 是否为隐藏专辑
      lang: ''
    }
  },
  computed: {
    backgroundStyle() {
      return { background: `url(${this.coverImgUrl})`, backgroundSize: 'cover' };
    }
  },
  watch: {
  // 监听 config 变化
  config: {
    immediate: true,
    handler(data) {
      if (data) {
        this.trackName = data.name;
        this.index = data.index;
        const coverImg = data.coverImg;
        if (!coverImg) {
          this.isHiddenAlbum = true;
          const store = useMainStore();
          const randomIndex = store.shiftRandomIndex();
          this.coverImgUrl = [defaultCover1, defaultCover2, defaultCover3, defaultCover4][randomIndex];
        } else {
          const encodedCoverImg = encodeURIComponent(coverImg).replace(/'/g, '%27');
          this.coverImgUrl = `${COVER_FILES_URL}${encodedCoverImg}`;
        }
      }
    }
  },
  // 监听 selectedCd 变化
  selectedCd(newCd) {
    if (newCd !== this.trackName) {
      this.showBubble = false;
    }
  }
},
  methods: {
    getText(key, lang) {
      return getText(key, lang);
    },
    highlight() {
      this.isHighlighted = true;
    },
    deHighlight() {
      this.isHighlighted = false;
    },
    // 切换气泡
    toggleActive() {
      const store = useMainStore();
      store.setShuffle(false)
      if(store.selectedIndex === this.index) {
        store.setSelectedIndex(-1);
      } else {
        store.setSelectedIndex(this.index);
      }
      this.showBubble = true;
    }
  },
  created() {
    const store = useMainStore();
    // 监听 store 中 selectedIndex 的变化
    this.$watch(() => store.selectedIndex, (newIndex) => {
      if (newIndex !== this.index) {
        this.showBubble = false;
      }
    });

    // 监听 store 中 playingIndex 的变化
    this.$watch(() => store.playingIndex, (newIndex) => {
      if (newIndex === this.index) {
        this.showBorder = true;
      } else {
        this.showBorder = false;
      }
    });

    // 监听 store 中 lang 的变化
    this.$watch(() => store.lang, (newLang) => {
      this.lang = newLang;
    });

    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    }
  },
}
</script>

<style scoped>
.rectangle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.98);
  border-radius: 10px;
  transition: background-image 0.1s ease, transform 0.05s ease-in-out;
  transform-origin: center;
  user-select: none;
}

.rectangle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.1s ease;
  border-radius: 10px;
}

.rectangle.highlight::after {
  opacity: 1;
}

.hidden-album .hidden-album-title {
  position: absolute;
  bottom: 5vw;
  left: 1.5vw;
  font-size: calc(1em + 2vw);
}

@media screen and (max-width: 700px) {
  .hidden-album .hidden-album-title {
    bottom: 8vw;
  }
}

.hidden-album .hidden-album-desc {
  position: absolute;
  bottom: 1.8vw;
  left: 1.5vw;
  font-size: 1em;
}

.bubble-text {
  background-image: url('@/assets/img/public/bubble.png');
  top: -20px;
  font-size: 1.6rem;
  padding: 1vw 2.1vw;
}

.rectangle.show-bubble .bubble-text {
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .rectangle:hover {
    transform: scale(1.0);
  }
}

.rectangle:active {
  transform: scale(0.95);
}

.rectangle.golden-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  background: url('@/assets/img/kk-cd/content-selection.png') center/cover no-repeat;
}
</style>
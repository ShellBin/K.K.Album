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
      <span class="hidden-album-title">隐藏曲目</span>
      <span class="hidden-album-desc">{{ trackName }}</span>
    </div>
    <span class="jelly bubble-text">{{ trackName }}</span>
  </div>
</template>

<script>
import { COVER_FILES_URL } from "@/config/config";
import { usePlayerStore } from "@/stores/player";
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
          const playerStore = usePlayerStore();
          const randomIndex = playerStore.shiftRandomIndex();
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
    highlight() {
      this.isHighlighted = true;
    },
    deHighlight() {
      this.isHighlighted = false;
    },
    // 切换气泡
    toggleActive() {
      const playerStore = usePlayerStore();
      if(playerStore.selectedIndex === this.index) {
        playerStore.setSelectedIndex(-1);
      } else {
        playerStore.setSelectedIndex(this.index);
      }
      this.showBubble = true;
    }
  },
  created() {
    const playerStore = usePlayerStore();
    // 监听 playerStore 中 selectedIndex 的变化
    this.$watch(() => playerStore.selectedIndex, (newIndex) => {
      if (newIndex !== this.index) {
        this.showBubble = false;
      }
    });

    // 监听 playerStore 中 playingIndex 的变化
    this.$watch(() => playerStore.playingIndex, (newIndex) => {
      if (newIndex === this.index) {
        this.showBorder = true;
      } else {
        this.showBorder = false;
      }
    });
  }
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
  bottom: 48px;
  left: 20px;
  font-size: 36px;
}

.hidden-album .hidden-album-desc {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 18px;
}

.bubble-text {
  background-image: url('@/assets/img/public/bubble.png');
  top: -20px;
  font-size: 1.3rem;
  padding: 1vw 3vw;
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
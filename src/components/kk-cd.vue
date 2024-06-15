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
    <span class="jelly bubble-text">{{ trackName }}</span>
  </div>
</template>

<script>
import { COVER_FILES_URL } from "@/config/config";
import { usePlayerStore } from "@/stores/player";

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
        if (data && data.coverImg) {
          this.trackName = data.name;
          this.index = data.index;
          const encodedCoverImg = encodeURIComponent(data.coverImg).replace(/'/g, '%27');
          this.coverImgUrl = `${COVER_FILES_URL}${encodedCoverImg}`;
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
      playerStore.setSelectedIndex(this.index);
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

.bubble-text {
  position: absolute;
  top: -20px;
  background-image: url('@/assets/img/kk-cd/coverTitle-bubble.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  padding: 1vw 3vw;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
  z-index: 100;
  font-size: 1.3rem;
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
<template>
  <div class="rectangle button" :class="{ 'highlight': isHighlighted, 'show-bubble': showBubble }"
  @mousedown="highlight"
  @mouseup="deHighlight"
  @mouseleave="deHighlight"
  @touchstart="toggleBubble"
  @mouseover="showBubble = true"
  @mouseout="showBubble = false"
  :style="backgroundStyle">
    <span class="jelly bubble-text">{{ trackName }}</span>
  </div>
</template>

<script>
import { COVER_FILES_URL } from "@/config/config";
import { usePlayerStore } from "@/stores/ux";

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
      isHighlighted: false,
      playing: false,
      coverImgUrl: '',
      trackName: '',
      showBubble: false
    }
  },
  computed: {
    backgroundStyle() {
      return { background: `url(${this.coverImgUrl})`, backgroundSize: 'cover' };
    }
  },
  watch: {
    config: {
      immediate: true,
      handler(data) {
      if (data && data.coverImg) {
        this.trackName = data.name;
        const encodedCoverImg = encodeURIComponent(data.coverImg).replace(/'/g, '%27');
        this.coverImgUrl = `${COVER_FILES_URL}${encodedCoverImg}`;
      }
    }
    },
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
    toggleBubble() {
      const playerStore = usePlayerStore();
      playerStore.setSelectedCd(this.trackName);
      this.isHighlighted = true;
      this.showBubble = true;
    }
  },
  created() {
    const playerStore = usePlayerStore();
    this.$watch(() => playerStore.selectedCd, (newCd) => {
      if (newCd === this.trackName) {
        // todo：显示金色边框
      } else {
        this.showBubble = false;
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
</style>
<template>
  <div class="rectangle button" :class="{ 'highlight': isHighlighted }" @mousedown="highlight" @mouseup="deHighlight" @mouseleave="deHighlight" :style="backgroundStyle"></div>
</template>

<script>
import { COVER_FILES_URL } from "@/config/config";

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
      loading: false,
      isHighlighted: false,
      playing: false,
      coverImgUrl: ''
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
      handler(newConfig) {
      if (newConfig && newConfig.coverImg) {
        this.loading = true;
        this.coverImgUrl = `${COVER_FILES_URL}${encodeURIComponent(newConfig.coverImg)}`;
        this.loading = false;
      }
    }
    }
  },
  methods: {
    highlight() {
      this.isHighlighted = true;
    },
    deHighlight() {
      this.isHighlighted = false;
    }
  }
}
</script>

<style scoped>
.rectangle {
  transform: scale(0.95);
  border-radius: 10px;
  transition: background-color 0.1s ease, background-image 0.1s ease, transform 0.05s ease-in-out;
  transform-origin: center;
}

.highlight {
  background-color: rgba(255, 255, 255, 0.5);
}

.rectangle:hover {
    transform: scale(1.0);
}

.rectangle:active {
  transform: scale(0.9);
}
</style>
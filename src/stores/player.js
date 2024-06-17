import { ref } from 'vue'
import { defineStore } from 'pinia'

// 通用的 setter 方法
function createSetter(refValue) {
  return (value) => {
    refValue.value = value
  }
}

export const usePlayerStore = defineStore('player', () => {
  const lang = ref('zh')
  const isPlaying = ref(false)
  const isShuffle = ref(false)
  const playList = ref([])
  const selectedIndex = ref(-1)
  const playingIndex = ref(-1)
  const trackName = ref('')
  const volume = ref(0)
  const randomGroup = ref([])
  const scrollPercent = ref(0)

  // 使用通用的 setter 方法
  const setLang = createSetter(lang)
  const setPlaying = createSetter(isPlaying)
  const setShuffle = createSetter(isShuffle)
  const setPlayList = createSetter(playList)
  const setSelectedIndex = createSetter(selectedIndex)
  const setPlayingIndex = createSetter(playingIndex)
  const setTrack = createSetter(trackName)
  const setVolume = createSetter(volume)
  const setRandomGroup = createSetter(randomGroup)
  const setScrollPercent = createSetter(scrollPercent)

  function shiftRandomIndex() {
    return randomGroup.value.shift()
  }

  return {
    lang, isPlaying, trackName, volume, isShuffle, selectedIndex, playingIndex, playList, randomGroup, scrollPercent,
    setLang, setPlaying, setTrack, setVolume, setShuffle, setSelectedIndex, setPlayingIndex, setPlayList, setRandomGroup, shiftRandomIndex, setScrollPercent
  }
})
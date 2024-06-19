import { ref } from 'vue'
import { defineStore } from 'pinia'

// 通用的 setter 方法
function createSetter(refValue) {
  return (value) => {
    refValue.value = value
  }
}

export const useMainStore = defineStore('main', () => {
  const lang = ref('')
  const isPlaying = ref(false)
  const isShuffle = ref(false)
  const playList = ref([])
  const selectedIndex = ref(-1)
  const playingIndex = ref(-1)
  const trackName = ref('')
  const volume = ref(0)
  const randomGroup = ref([])
  const scrollPercent = ref(0)
  const modalDisplay = ref('')

  // 使用通用的 setter 方法
  const setPlaying = createSetter(isPlaying)
  const setShuffle = createSetter(isShuffle)
  const setPlayList = createSetter(playList)
  const setSelectedIndex = createSetter(selectedIndex)
  const setPlayingIndex = createSetter(playingIndex)
  const setTrack = createSetter(trackName)
  const setRandomGroup = createSetter(randomGroup)
  const setScrollPercent = createSetter(scrollPercent)
  const setModalDisplay = createSetter(modalDisplay)

  function shiftRandomGroup() {
    return randomGroup.value.shift()
  }

  function setVolume(newVolume) {
    volume.value = newVolume;
    localStorage.setItem('volume', volume.value);
  }

  function setLang(newLang) {
    lang.value = newLang;
    localStorage.setItem('lang', lang.value);
  }

  return {
    lang, setLang,
    isPlaying, setPlaying,
    trackName, setTrack,
    volume, setVolume,
    isShuffle, setShuffle,
    selectedIndex, setSelectedIndex,
    playingIndex, setPlayingIndex,
    playList, setPlayList,
    randomGroup, setRandomGroup, shiftRandomGroup,
    scrollPercent, setScrollPercent,
    modalDisplay, setModalDisplay
  }
})
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const lang = ref('zh')
  const isPlaying = ref(false)
  const isShuffle = ref(false)
  const playList = ref([])
  const selectedIndex = ref(-1)
  const playingIndex = ref(-1)
  const trackName = ref('')
  const volume = ref(localStorage.getItem('volume') || 3)

  function setLang(lang) {
    lang.value = lang
  }

  function setPlaying(state) {
    isPlaying.value = state
  }

  function setTrack(track) {
    trackName.value = track
  }

  function setVolume(vol) {
    volume.value = vol
  }

  function setShuffle(state) {
    isShuffle.value = state
  }

  function setPlayList(list) {
    playList.value = list
  }

  function setSelectedIndex(index) {
    selectedIndex.value = index
  }

  function setPlayingIndex(index) {
    playingIndex.value = index
  }

  return {
    lang, isPlaying, trackName, volume, isShuffle, selectedIndex, playingIndex, playList,
    setLang, setPlaying, setTrack, setVolume, setShuffle, setSelectedIndex, setPlayingIndex, setPlayList
  }
})
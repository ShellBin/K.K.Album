import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const isPlaying = ref(false)
  const isShuffle = ref(false)
  const selectedIndex = ref(-1)
  const playingIndex = ref(-1)
  const trackName = ref('')
  const volume = ref(3)

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

  function setSelectedIndex(index) {
    selectedIndex.value = index
  }

  function setPlayingIndex(index) {
    playingIndex.value = index
  }

  return {
    isPlaying, trackName, volume, isShuffle, selectedIndex, playingIndex,
    setPlaying, setTrack, setVolume, setShuffle, setSelectedIndex, setPlayingIndex
  }
})
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const isPlaying = ref(false)
  const isShuffle = ref(false)
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

  return {
    isPlaying, trackName, volume, isShuffle,
    
    setPlaying, setTrack, setVolume, setShuffle
  }
})
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const selectedCd = ref(null)

  function setSelectedCd(cd) {
    selectedCd.value = cd
  }

  return {
    selectedCd,
    
    setSelectedCd,
  }
})
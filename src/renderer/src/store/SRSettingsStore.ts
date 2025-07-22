import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSRSettingsStore = defineStore(
  'SRSettings',
  () => {
    const selectedSRModel = ref('RealESRGAN_RealESRGAN_x2plus_2x.pth')
    const ghProxy: Ref<string | null> = ref(null)
    const targetScale: Ref<number | null> = ref(null)

    return {
      selectedSRModel,
      ghProxy,
      targetScale,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['selectedSRModel', 'ghProxy', 'targetScale'],
    },
  },
)

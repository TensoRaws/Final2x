import type { LogInst } from 'naive-ui'
import type { Ref } from 'vue'
import type { NaiveDarkModeType } from '../components/NaiveDarkMode.vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalSettingsStore = defineStore(
  'GlobalSettings',
  () => {
    const darkMode: Ref<NaiveDarkModeType> = ref('system')
    const globalcolor = ref('#fffafa')
    const naiveTheme: Ref<any> = ref(undefined)

    const changeRoute = ref(false)

    const langsNum = ref(114514)

    const ProgressPercentage = ref(0)
    const CommandLOG = ref('')
    const logInstRef = ref<LogInst | null>(null)
    const StartCommandLock = ref(false)
    const SrSuccess = ref(false)

    const openOutputFolder = ref(true)

    return {
      darkMode,
      globalcolor,
      naiveTheme,
      changeRoute,
      langsNum,
      ProgressPercentage,
      CommandLOG,
      StartCommandLock,
      SrSuccess,
      logInstRef,
      openOutputFolder,
    }
  },
  {
    persist: {
      pick: [
        'langsNum',
        'darkMode',
        'naiveTheme',
        'globalcolor',
        'openOutputFolder',
      ],
    },
  },
)

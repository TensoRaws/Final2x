import type { UploadFileInfo } from 'naive-ui'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIOPathStore = defineStore(
  'IOPath',
  () => {
    const inputpathMap = ref<Map<string, string>>(new Map())
    const inputFileList = ref<UploadFileInfo[]>([])

    const outputpath = ref<string>('')
    const outputpathLock = ref<boolean>(false)

    return {
      inputpathMap,
      inputFileList,
      outputpath,
      outputpathLock,
    }
  },
  {
    persist: {
      pick: ['outputpath', 'outputpathLock'],
    },
  },
)

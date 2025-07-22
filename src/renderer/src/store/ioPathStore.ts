import type { UploadFileInfo } from 'naive-ui'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIOPathStore = defineStore(
  'IOPath',
  () => {
    const inputpathMap = ref<Map<string, string>>(new Map())
    const outputpath = ref<string>('')
    const outputpathLock = ref<boolean>(false)

    const inputFileList = ref<UploadFileInfo[]>([])

    return {
      inputpathMap,
      outputpath,
      outputpathLock,
      inputFileList,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['outputpath', 'outputpathLock'],
    },
  },
)

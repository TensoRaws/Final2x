import type { Ref } from 'vue'

import { ref } from 'vue'

export const torchDeviceList: Ref<any[]> = ref([
  { value: 'auto', label: 'Auto' },
  { value: 'cuda', label: 'CUDA' },
  { value: 'mps', label: 'MPS' },
  { value: 'cpu', label: 'CPU' },
])

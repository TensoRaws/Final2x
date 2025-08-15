<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useGlobalSettingsStore } from '../store/globalSettingsStore'
import { useIOPathStore } from '../store/ioPathStore'
import { useSRSettingsStore } from '../store/SRSettingsStore'
import ioPath from '../utils/ioPath'
import { modelOptions } from '../utils/modelOptions'
import { torchDeviceList } from '../utils/torchDeviceList'

const { openOutputFolder }
  = storeToRefs(useGlobalSettingsStore())
const { selectedSRModel, ghProxy, targetScale, selectedTorchDevice } = storeToRefs(useSRSettingsStore())
const { outputpath } = storeToRefs(useIOPathStore())
const { t } = useI18n()

function getPath(): void {
  const handleSelected = (_, path): void => {
    if (path[0] !== undefined) {
      // console.log(ioPath.getoutputpath())
      ioPath.setoutputpathManual(path[0])
    }
  }
  window.electron.ipcRenderer.removeAllListeners('selectedItem') // 取消监听，防止多次触发
  window.electron.ipcRenderer.send('open-directory-dialog', ['openDirectory'])
  window.electron.ipcRenderer.on('selectedItem', handleSelected)
}
</script>

<template>
  <n-card :bordered="false" class="settings-card">
    <n-space class="vertical" vertical justify="center">
      <n-space>
        <n-button dashed type="success" style="width: 80px">
          {{ t('Final2xSettings.text11') }}
        </n-button>
        <n-select v-model:value="selectedSRModel" :options="modelOptions" style="width: 465px" />
      </n-space>

      <n-space>
        <n-button dashed type="success" style="width: 80px">
          {{ t('Final2xSettings.text10') }}
        </n-button>

        <n-select
          v-model:value="selectedTorchDevice"
          :options="torchDeviceList"
          style="width: 150px"
        />

        <n-button dashed type="success" style="width: 120px">
          {{ t('Final2xSettings.text15') }}
        </n-button>

        <n-input-number
          v-model:value="targetScale"
          :max="99999999"
          :min="0"
          :step="0.2"
          :placeholder="t('Final2xSettings.text16')"
          style="width: 171px"
        />
      </n-space>

      <n-space>
        <n-button dashed type="success" style="width: 80px">
          {{ t('Final2xSettings.text18') }}
        </n-button>

        <n-input
          v-model:value="ghProxy"
          placeholder="Github Proxy, Example: https://github.abskoop.workers.dev/"
          style="width: 465px"
        />
      </n-space>

      <n-space>
        <n-button round type="success" style="height: 35px; width: 150px" @click="getPath">
          {{ t('Final2xSettings.text17') }}
        </n-button>

        <n-switch v-model:value="openOutputFolder" size="large" style="height: 35px; width: 76px">
          <template #checked>
            OPEN
          </template>
        </n-switch>

        <n-input v-model:value="outputpath" :placeholder="outputpath" round style="width: 308px" />
      </n-space>
    </n-space>
  </n-card>
</template>

<style lang="scss" scoped>
.settings-card {
  width: fit-content;
  margin: 0 auto;
  height: 100%;
  // transparent
  background-color: rgba(255, 255, 255, 0);

  .vertical {
    height: 100%;

    > div {
      margin-bottom: 20px;
    }
  }
}
</style>

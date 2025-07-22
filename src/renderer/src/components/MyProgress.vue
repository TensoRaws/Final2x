<script lang="ts" setup>
import { useDialog, useNotification } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useGlobalSettingsStore } from '../store/globalSettingsStore'
import { getFinal2xconfig } from '../utils/getFinal2xconfig'
import ioPATH from '../utils/IOPath'

const { t } = useI18n()
const notification = useNotification()
const dialog = useDialog()
const {
  CommandLOG,
  logInstRef,
  StartCommandLock,
  SrSuccess,
  ProgressPercentage,
  openOutputFolder,
} = storeToRefs(useGlobalSettingsStore())

const showLOG = ref(false)

onMounted(() => {
  watchEffect(() => {
    if (CommandLOG.value) {
      nextTick(() => {
        logInstRef.value?.scrollTo({ position: 'bottom', silent: true })
      })
    }
  })
})

function handleCommandLOG(log: string): void {
  CommandLOG.value += log

  const skipImageRegex = /______Skip_Image______:(.+)/
  const processingRegex = /Processing------\[ ([\d.]+)% /
  const srSuccessRegex = /______SR_COMPLETED______/

  const skipImageMatch = log.match(skipImageRegex)
  const processingMatch = log.match(processingRegex)
  const srSuccessMatch = log.match(srSuccessRegex)

  if (skipImageMatch) {
    const imagePath = skipImageMatch[1]
    MyProgressNotifications.SkipImage(imagePath)
  }

  if (processingMatch) {
    ProgressPercentage.value = Number.parseFloat(processingMatch[1])
  }

  if (srSuccessMatch) {
    SrSuccess.value = true
  }
}

class MyProgressNotifications {
  static StartSR(): void {
    notification.success({
      title: t('MyProgress.text0'),
      duration: 1500,
    })
  }

  static SRprocessing(): void {
    notification.warning({
      title: t('MyProgress.text1'),
      duration: 1500,
    })
  }

  static SRListEmpty(): void {
    notification.warning({
      title: t('MyProgress.text2'),
      content: t('MyProgress.text3'),
      duration: 1500,
      keepAliveOnHover: true,
    })
  }

  static TerminateSR(): void {
    notification.error({
      title: t('MyProgress.text4'),
      duration: 1500,
      keepAliveOnHover: true,
    })
  }

  static SkipImage(imagePath: string): void {
    notification.warning({
      title: t('MyProgress.text5'),
      content: imagePath,
      duration: 2000,
      keepAliveOnHover: true,
    })
  }
}

class MyProgressDialogs {
  static SrFailed(): void {
    dialog.error({
      title: t('MyProgress.text9'),
      content: t('MyProgress.text10'),
    })
  }
}

function StartSR(): void {
  if (StartCommandLock.value) {
    MyProgressNotifications.SRprocessing()
    return
  }

  if (ioPATH.isEmpty()) {
    MyProgressNotifications.SRListEmpty()
    return
  }

  StartCommandLock.value = true // START LOCK
  SrSuccess.value = false // RESET SR SUCCESS

  MyProgressNotifications.StartSR()

  const command = getFinal2xconfig()

  CommandLOG.value += `\n${command}\n`
  CommandLOG.value += `OPEN OUTPUT FOLDER: ${openOutputFolder.value}\n`

  window.electron.ipcRenderer.send('execute-command', command, openOutputFolder.value)
}

function TerminateSR(): void {
  window.electron.ipcRenderer.send('kill-command')
  MyProgressNotifications.TerminateSR()
}

watchEffect(() => {
  window.electron.ipcRenderer.on('command-stdout', (_, data) => {
    handleCommandLOG(data)
  })
  window.electron.ipcRenderer.on('command-stderr', (_, data) => {
    handleCommandLOG(data)
  })
  window.electron.ipcRenderer.on('command-close-code', (_, data) => {
    handleCommandLOG(`CLOSE CODE:${data}`)
    StartCommandLock.value = false

    if (!SrSuccess.value) {
      MyProgressDialogs.SrFailed()
    }
    else {
      ioPATH.clearALL()
    }
  })
})
</script>

<template>
  <div>
    <div class="control">
      <n-progress
        :percentage="ProgressPercentage"
        color="green"
        :height="34"
        indicator-placement="inside"
        processing
        type="line"
      />
      <n-button round secondary strong type="success" @click="StartSR">
        {{ t('MyProgress.text6') }}
      </n-button>

      <n-button round secondary strong type="error" @click="TerminateSR">
        {{ t('MyProgress.text7') }}
      </n-button>

      <n-button round secondary strong type="warning" @click="showLOG = !showLOG">
        {{ t('MyProgress.text8') }}
      </n-button>
    </div>

    <n-drawer v-model:show="showLOG" height="385" placement="top">
      <n-drawer-content :native-scrollbar="false" title="">
        <br>
        <n-card hoverable size="small" title="Log">
          <n-log ref="logInstRef" :log="CommandLOG" trim />
        </n-card>
      </n-drawer-content>
    </n-drawer>

    <n-divider class="n-divider" />
  </div>
</template>

<style lang="scss">
.control {
  box-sizing: border-box;
  width: 100%;
  padding: 30px 40px 0 40px;
  display: flex;
  justify-content: space-between;

  > div {
    margin: 0 5px;
  }

  > button {
    margin: 0 5px;
  }
}

.progress {
  margin-left: -30px;
  margin-top: 10px;
}

.ButtonSpace {
  margin-right: 40px;
  margin-top: 30px;
}

.n-divider {
  margin: 10px 0 0 0 !important;
}
</style>

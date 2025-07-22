<script lang="ts" setup>
import { HomeOutlined, SettingOutlined, TranslationOutlined } from '@vicons/antd'
import { ContrastSharp, MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia'
import router from '../router'
import { useGlobalSettingsStore } from '../store/globalSettingsStore'
import { clickDebounce } from '../utils'
import { switchLanguage } from '../utils/switchLanguage'

const { darkMode, changeRoute } = storeToRefs(useGlobalSettingsStore())

function handleRoute(): void {
  if (changeRoute.value === false) {
    changeRoute.value = true
    router.push('/Final2xSettings')
  }
  else {
    changeRoute.value = false
    router.push('/')
  }
}

const handleDarkMode = clickDebounce((): void => {
  // const darkmodeList : Array<NaiveDarkModeType> = ['system', 'light', 'dark']
  if (darkMode.value === 'system') {
    darkMode.value = 'light'
  }
  else if (darkMode.value === 'light') {
    darkMode.value = 'dark'
  }
  else {
    darkMode.value = 'system'
  }
})
</script>

<template>
  <div>
    <n-space class="main-buttons">
      <n-button style="font-size: 36px" text @click="handleRoute">
        <n-icon>
          <div v-if="changeRoute === false">
            <SettingOutlined />
          </div>
          <div v-else>
            <HomeOutlined />
          </div>
        </n-icon>
      </n-button>

      <n-button style="font-size: 36px" text @click="switchLanguage">
        <n-icon>
          <TranslationOutlined />
        </n-icon>
      </n-button>

      <n-button style="font-size: 36px" text @click="handleDarkMode">
        <n-icon>
          <div v-if="darkMode === 'light'">
            <SunnyOutline />
          </div>
          <div v-else-if="darkMode === 'dark'">
            <MoonOutline />
          </div>
          <div v-else>
            <ContrastSharp />
          </div>
        </n-icon>
      </n-button>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
$buttom-bottom: 8px;
.main-buttons {
  width: 180px;
}
</style>

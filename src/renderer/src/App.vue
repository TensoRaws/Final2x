<script lang="ts" setup>
import { NConfigProvider, NDialogProvider, NGlobalStyle, NNotificationProvider } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import BottomNavigation from './components/bottomNavigation.vue'
import MyDarkMode from './components/MyDarkMode.vue'
import MyProgress from './components/MyProgress.vue'
import TrafficLightsButtons from './components/TrafficLightsButtons.vue'
import { useGlobalSettingsStore } from './store/globalSettingsStore'
import { getLanguage } from './utils'

const { locale } = useI18n()
const { langsNum, naiveTheme, globalcolor } = storeToRefs(useGlobalSettingsStore())

watch(langsNum, () => {
  // 切换语言
  locale.value = getLanguage(langsNum.value).lang
  console.log('locale: ', locale.value)
})

onMounted(async () => {
  if (langsNum.value !== 114514) {
    // 当语言不是跟随环境时，设置语言
    locale.value = getLanguage(langsNum.value).lang
  }
})

const themeOverrides = {
  Select: {
    peers: {
      InternalSelectMenu: {
        height: '200px',
      },
    },
  },
}
</script>

<template>
  <NConfigProvider :theme="naiveTheme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NNotificationProvider class="n-config-provider" placement="top">
      <NDialogProvider>
        <div class="background">
          <MyDarkMode />
          <TrafficLightsButtons />
          <MyProgress />
          <div class="view">
            <RouterView v-slot="{ Component }">
              <transition mode="out-in" name="custom-fade">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </RouterView>
          </div>
          <BottomNavigation />
        </div>
      </NDialogProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
.custom-fade-enter-active {
  transition: all 0.2s ease-out;
}

.custom-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.custom-fade-enter-from,
.custom-fade-leave-to {
  opacity: 0;
}

$global-color: v-bind(globalcolor);
$buttom-bottom: 8px;

::-webkit-scrollbar {
  display: none;
}

.n-config-provider {
  width: 100vw;
  height: 100vh;
}

.background {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: $global-color;
  transition: all 300ms ease-in-out;
  //padding-top: 30px;
  display: flex;
  flex-direction: column;

  .view {
    overflow: scroll;
    flex: 1;
  }
}

.fade-enter-active {
  transition: opacity 0.6s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

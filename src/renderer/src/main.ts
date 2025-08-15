import {
  // create naive ui
  create,
  // component
  NButton,
  NCard,
  NDivider,
  NDrawer,
  NDrawerContent,
  NIcon,
  NImage,
  NInput,
  NInputNumber,
  NLog,
  NPopover,
  NProgress,
  NSelect,
  NSpace,
  NSwitch,
  NText,
  NUpload,
  NUploadDragger,
} from 'naive-ui'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import router from './router'
// 通用字体
import 'vfonts/OpenSans.css'

const naive = create({
  components: [
    NButton,
    NDivider,
    NSpace,
    NIcon,
    NImage,
    NCard,
    NDrawer,
    NDrawerContent,
    NLog,
    NProgress,
    NText,
    NUpload,
    NUploadDragger,
    NInput,
    NInputNumber,
    NPopover,
    NSelect,
    NSwitch,
  ],
})

const pinia = createPinia()
pinia.use(createPersistedState({
  storage: localStorage,
}))

createApp(App).use(naive).use(i18n).use(pinia).use(router).mount('#app')

import { createRouter, createWebHashHistory } from 'vue-router'
import Final2xHome from '../views/Final2xHome.vue'
import Final2xSettings from '../views/Final2xSettings.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Final2xHome',
    },
    {
      path: '/Final2xHome',
      name: 'Final2xHome',
      component: Final2xHome,
    },
    {
      path: '/Final2xSettings',
      name: 'Final2xSettings',
      component: Final2xSettings,
    },
  ],
})

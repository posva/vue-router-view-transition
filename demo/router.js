import Vue from 'vue'
import Router from 'vue-router'

const Start = () => import('./Start.vue')
const Middle = () => import('./Middle.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Start },
    { path: '/middle', component: Middle },
  ],
  async scrollBehavior(to, from, savedPosition) {
    // await scrollWaiter.wait()
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

export default router

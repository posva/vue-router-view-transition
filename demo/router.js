import Vue from 'vue'
import Router from 'vue-router'
import { waitForTransition } from '../src'

const Start = () => import('./Start.vue')
const Middle = () => import('./Middle.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Start },
    { path: '/middle', component: Middle },
  ],
  scrollBehavior: waitForTransition(function(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }),
})

export default router

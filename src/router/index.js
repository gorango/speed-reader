import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeView from '../views/Home'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: `/`, component: HomeView }
  ]
})

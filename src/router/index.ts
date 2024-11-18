import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('../views/ForgetView.vue')
    },
    {
      path: '/quize/:id',
      name: 'quize',
      component: () => import('../views/QuizeView.vue')
    },

  ]
})

export default router
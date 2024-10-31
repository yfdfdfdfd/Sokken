import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import YourComponentView from '../views/YourComponentView.vue'; // YourComponentViewをインポート

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
      path: '/problem',
      name: 'problem',
      component: () => import('../views/ProblemView.vue')
    },
    {
      path: '/your-component', // 新しいルートを追加
      name: 'your-component',
      component: YourComponentView
    }
  ]
})

export default router

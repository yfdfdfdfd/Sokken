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
    {
      path: '/quizepractice/:id',
      name: 'quizepractice',
      component: () => import('../views/QuizepracticeView.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('../views/PracticeView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryOutlineView.vue')
    },
    {
      path: '/history/:quizeListUuid',
      name: 'historydetail',
      component: () => import('../views/HistoryDetailView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

export default router

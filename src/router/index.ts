import { createRouter, createWebHistory } from 'vue-router'
import TodoWritePage from '@/components/pages/TodoWritePage.vue'
import TodoEditPage from '@/components/pages/TodoEditPage.vue'
import TodoDetailPage from '@/components/pages/TodoDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/write',
      name: 'todoWrite',
      component: TodoWritePage,
    },
    {
      path: '/edit/:id',
      name: 'todoEdit',
      component: TodoEditPage,
    },
    {
      path: '/detail/:id',
      name: 'todoDetail',
      component: TodoDetailPage,
    },
  ],
})

export default router

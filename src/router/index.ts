import { createRouter, createWebHistory } from 'vue-router'
import TodoWritePage from '@/components/pages/TodoWritePage.vue'
import TodoEditPage from '@/components/pages/TodoEditPage.vue'

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
  ],
})

export default router

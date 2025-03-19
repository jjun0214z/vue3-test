import { createRouter, createWebHistory } from 'vue-router'
import TodoWrite from '@/components/pages/TodoWritePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/write',
      name: 'todoWrite',
      component: TodoWrite,
    },
  ],
})

export default router

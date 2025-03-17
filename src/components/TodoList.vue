<template>
  <ul class="todo-list">
    <li v-for="todo in todos" :key="todo.id" class="todo-item">
      <RouterLink :to="`/todo/${todo.id}`" class="todo-link">
        <h2 class="todo-title">{{ todo.title }}</h2>
        <p class="todo-author">작성자: {{ todo.name }}</p>
        <p class="todo-content">{{ todo.contents }}</p>
        <p class="todo-time">{{ formatDate(todo.createdAt) }}</p>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ITodos } from '@/stores/useTodos'

interface IProps {
  todos: ITodos[]
}

const { todos } = defineProps<IProps>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<style scoped>
.todo-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.todo-item {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.todo-link {
  text-decoration: none;
  color: inherit;
}

.todo-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: #2c3e50;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 8px;
}

.todo-author,
.todo-content,
.todo-time {
  margin: 4px 0;
  color: #333;
}

.todo-time {
  font-size: 12px;
  color: #7f8c8d;
}
</style>

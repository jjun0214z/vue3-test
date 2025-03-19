<template>
  <ul class="todo-list">
    <li v-for="todo in todos" :key="todo.id" class="todo-item">
      <div class="todo-header">
        <RouterLink :to="`/todo/${todo.id}`" class="todo-link">
          <h2 class="todo-title">{{ todo.title }}</h2>
        </RouterLink>
        <div class="todo-actions">
          <button @click="editTodo(todo.id)" class="edit-button">수정</button>
          <button @click="deleteTodo(todo.id)" class="delete-button">삭제</button>
        </div>
      </div>
      <p class="todo-content">{{ todo.contents }}</p>
      <p class="todo-time">{{ formatDate(todo.createdAt) }}</p>
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

// 수정 및 삭제 메서드 정의
const editTodo = (id: number) => {
  // 수정 로직 구현
  console.log(`수정할 투두 ID: ${id}`)
}

const deleteTodo = (id: number) => {
  // 삭제 로직 구현
  console.log(`삭제할 투두 ID: ${id}`)
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

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.todo-content,
.todo-time {
  margin: 4px 0;
  color: #333;
}

.todo-time {
  font-size: 12px;
  color: #7f8c8d;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.edit-button,
.delete-button {
  padding: 6px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #343a40;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #e9ecef;
}

.delete-button {
  color: #dc3545;
  border-color: #dc3545;
}

.delete-button:hover {
  background-color: #f8d7da;
}
</style>

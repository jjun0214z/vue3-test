<template>
  <ul class="todo-list" v-if="todos.length > 0">
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
  <NoTodoList v-else />
</template>

<script setup lang="ts">
import { useTodosStore, type ITodos } from '@/stores/useTodos'
import NoTodoList from './common/NoTodoList.vue'
import router from '@/router'

interface IProps {
  todos: ITodos[]
}

const { todos } = defineProps<IProps>()
const todoStore = useTodosStore()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

const editTodo = (id: number) => {
  router.push({
    name: 'todoEdit',
    params: { id },
  })
}

const deleteTodo = (id: number) => {
  todoStore.deleteTodo(id)
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

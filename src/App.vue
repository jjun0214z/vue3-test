<template>
  <template v-if="currentPath === '/'">
    <div class="todo-list-container">
      <header class="header">
        <h1 class="logo">TodoList</h1>
        <RouterLink to="/write" class="write-button">글쓰기</RouterLink>
      </header>
      <LoadingComponent v-if="todoStore.loading" />
      <TodoList v-else :todos="todoStore.todos" />
    </div>
  </template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTodosStore } from '@/stores/useTodos'
import LoadingComponent from './components/common/LoadingComponent.vue'
import TodoList from './components/TodoList.vue'
import { useRoute } from 'vue-router'

const todoStore = useTodosStore()
const route = useRoute()
const currentPath = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath
  },
)

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<style scoped>
.todo-list-container {
  padding: 16px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

.write-button {
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>

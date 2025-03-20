<template>
  <div class="todo-form">
    <h1 class="form-title">Edit Todo</h1>
    <form @submit.prevent="editTodo">
      <TodoWrite
        :todo="{ title: todoTitle, contents: todoContent }"
        @update-todo="handleUpdateTodo"
      >
        <button type="submit" class="submit-button">수정하기</button>
        <button type="button" class="list-button" @click="goToList">목록 보기</button>
      </TodoWrite>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TodoWrite from '../TodoWrite.vue'
import { useTodosStore, type ITodos } from '@/stores/useTodos'
import { onMounted, ref } from 'vue'

const router = useRouter()
const todoStore = useTodosStore()
const todoTitle = ref('')
const todoContent = ref('')
const todoId = String(router.currentRoute.value.params.id)

const handleUpdateTodo = ({ title, contents }: Omit<ITodos, 'id' | 'createdAt'>) => {
  todoTitle.value = title
  todoContent.value = contents
}

const editTodo = async () => {
  const res = await todoStore.updateTodo({
    id: todoId,
    title: todoTitle.value,
    contents: todoContent.value,
  })

  if (res?.status === 200) {
    alert('할일이 수정되었습니다.')
    goToList()
  }
}

const goToList = () => {
  router.push('/')
}

onMounted(async () => {
  if (todoId) {
    const todoData = await todoStore.fetchTodoById(todoId)
    if (todoData) {
      const { title, contents } = todoData
      todoTitle.value = title
      todoContent.value = contents
    }
  }
})
</script>

<style scoped>
.todo-form {
  max-width: 100%;
  height: 100vh;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #007bff;
  font-weight: bold;
}

.submit-button,
.list-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

.list-button {
  background-color: #6c757d;
  color: white;
}

.list-button:hover {
  background-color: #5a6268;
}
</style>

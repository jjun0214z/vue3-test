<template>
  <div class="todo-detail">
    <h1 class="detail-title">{{ todoTitle }}</h1>
    <p class="detail-content">{{ todoContent }}</p>
    <div class="button-group">
      <div class="button-row">
        <button class="edit-button" @click="editTodo">수정하기</button>
        <button class="delete-button" @click="deleteTodo">삭제하기</button>
      </div>
      <div class="button-row">
        <button class="list-button" @click="goToList">목록 보기</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '@/stores/useTodos'

const router = useRouter()
const todoStore = useTodosStore()

const todoTitle = ref<string>('')
const todoContent = ref<string>('')

const todoId = String(router.currentRoute.value.params.id)

const fetchTodoDetail = async () => {
  const todoData = await todoStore.fetchTodoById(todoId)
  if (todoData) {
    const { title, contents } = todoData
    todoTitle.value = title
    todoContent.value = contents
  }
}

onMounted(() => {
  fetchTodoDetail()
})

const editTodo = () => {
  router.push({
    name: 'todoEdit',
    params: { id: todoId },
  })
}

const deleteTodo = async () => {
  const res = await todoStore.deleteTodo(todoId)
  if (res?.status === 200) {
    alert('할일이 삭제되었습니다.')
    goToList()
  } else {
    alert('할일 삭제에 실패했습니다.')
  }
}

const goToList = () => {
  router.push('/')
}
</script>

<style scoped>
.todo-detail {
  max-width: 100%;
  height: 100vh;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.detail-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #343a40;
  font-weight: bold;
}

.detail-content {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: #495057;
}

.button-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.button-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}

.edit-button,
.delete-button,
.list-button {
  width: 50%;
  padding: 12px; /* 원래 크기로 패딩 조정 */
  border: none;
  border-radius: 4px;
  font-size: 16px; /* 원래 크기로 폰트 사이즈 조정 */
  cursor: pointer;
  margin: 0 5px;
}

.edit-button {
  background-color: #6c757d;
  color: #ffffff;
}

.edit-button:hover {
  background-color: #5a6268;
}

.delete-button {
  background-color: #dc3545;
  color: #ffffff;
}

.delete-button:hover {
  background-color: #c82333;
}

.list-button {
  width: 100%;
  background-color: #007bff;
  color: #ffffff;
}

.list-button:hover {
  background-color: #0056b3;
}
</style>

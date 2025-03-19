<template>
  <div class="form-group">
    <label for="todoTitle">제목</label>
    <input type="text" id="todoTitle" v-model="todoTitle" required />
  </div>
  <div class="form-group">
    <label for="todoContent">내용</label>
    <textarea id="todoContent" v-model="todoContent" required></textarea>
  </div>
  <slot />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
const emit = defineEmits(['updateTodo'])

const todoTitle = ref('')
const todoContent = ref('')

watch(todoTitle, (newValue) => {
  emit('updateTodo', { title: newValue, content: todoContent.value })
})

watch(todoContent, (newValue) => {
  emit('updateTodo', { title: todoTitle.value, content: newValue })
})

onBeforeUnmount(() => {
  todoTitle.value = ''
  todoContent.value = ''
})
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #343a40;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  color: #495057;
  background-color: #fff;
}

textarea {
  resize: none;
  height: 100px;
}
</style>

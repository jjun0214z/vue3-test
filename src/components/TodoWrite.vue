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
import type { ITodos } from '@/stores/useTodos'
import { onBeforeUnmount, ref, watch } from 'vue'

interface IProps {
  todo?: Omit<ITodos, 'id' | 'createdAt'>
}

const { todo } = defineProps<IProps>()
const emit = defineEmits(['updateTodo'])

const todoTitle = ref('')
const todoContent = ref('')

watch(todoTitle, (newValue) => {
  emit('updateTodo', { title: newValue, contents: todoContent.value })
})

watch(todoContent, (newValue) => {
  emit('updateTodo', { title: todoTitle.value, contents: newValue })
})

watch(
  () => todo,
  (newValue) => {
    if (newValue) {
      const { title = '', contents = '' } = newValue
      todoTitle.value = title
      todoContent.value = contents
    }
  },
)

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

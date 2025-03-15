<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { getCurrentInstance, onMounted, ref } from 'vue'

interface IData {
  id: string
  title: string
  content: string
}

const instance = getCurrentInstance()
const list = ref<IData[]>([])

const fetchData = async () => {
  try {
    const res: AxiosResponse<IData[]> | undefined =
      await instance?.appContext.config.globalProperties.$axios({
        url: '/posts',
        method: 'get',
      })

    list.value = res?.data || []
  } catch (error) {
    console.log(error)
  }
}

const updatePosts = async (data: { title: string; content: string }) => {
  try {
    const res: AxiosResponse<IData> | undefined =
      await instance?.appContext.config.globalProperties.$axios({
        url: '/posts',
        method: 'post',
        data,
      })

    if (res?.status === 201) {
      list.value = [...list.value, res.data]
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <header>
    <div class="wrapper">
      <button
        @click="
          updatePosts({
            title: '새로운 포스트',
            content: '이것은 새로운 포스트입니다.',
          })
        "
      >
        추가
      </button>
      <ul>
        <li v-for="item in list" :key="item.id">{{ item }}</li>
      </ul>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

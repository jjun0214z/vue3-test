<script setup lang="ts">
import { onMounted } from 'vue'
import fetcher from './assets/utils/fetcher'

const fetchData = async () => {
  const res = await fetcher({
    url: '/api/users',
    method: 'get',
  })

  console.log(res)
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

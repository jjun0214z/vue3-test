import axios, { type AxiosInstance } from 'axios'
import type { App } from 'vue'

const AxiosPlugin = {
  install(app: App) {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: 'https://67d7e9329d5e3a10152c84bd.mockapi.io',
      timeout: 1000,
    })

    app.config.globalProperties.$axios = axiosInstance
  },
}

export default AxiosPlugin

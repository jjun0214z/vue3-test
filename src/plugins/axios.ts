import axios, { type AxiosInstance } from 'axios'
import type { App } from 'vue'

const AxiosPlugin = {
  install(app: App) {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 1000,
    })

    app.config.globalProperties.$axios = axiosInstance
  },
}

export default AxiosPlugin

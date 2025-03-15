import axios from 'axios'

const fetcher = axios.create({
  baseURL: '/api',
})

fetcher.interceptors.request.use(async (config) => {
  return config
})

export default fetcher

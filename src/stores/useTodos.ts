import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'

export interface ITodos {
  id: number
  createdAt: string
  title: string
  contents: string
}

export interface ITodosState {
  todos: ITodos[]
  loading: boolean
  error: string | null
}

export const useTodosStore = defineStore('todos', {
  state: (): ITodosState => ({
    todos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async handleApiCall<T>(apiCall: () => Promise<T>): Promise<T | null> {
      this.loading = true
      this.error = null

      try {
        return await apiCall()
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          this.error = err.message
        }

        this.error = 'API 호출에 실패했습니다.'
        return null
      } finally {
        this.loading = false
      }
    },

    async fetchTodos() {
      return await this.handleApiCall<ITodos[]>(async () => {
        const response = await axios({
          method: 'get',
          url: '/api/todos',
        })
        this.todos = response.data
        return response.data
      })
    },

    async createTodo(todo: Omit<ITodos, 'id' | 'createdAt'>) {
      return await this.handleApiCall<AxiosResponse<ITodos>>(async () => {
        const response = await axios({
          method: 'post',
          url: '/api/todos',
          data: todo,
        })
        this.todos.push(response.data)
        return response
      })
    },

    async updateTodo(todo: ITodos) {
      return await this.handleApiCall<ITodos>(async () => {
        const response = await axios({
          method: 'put',
          url: `/api/todos/${todo.id}`,
          data: todo,
        })
        const index = this.todos.findIndex((t) => t.id === todo.id)
        if (index !== -1) {
          this.todos[index] = response.data
        }
        return response.data
      })
    },

    async deleteTodo(todoId: number) {
      return await this.handleApiCall<void>(async () => {
        await axios({
          method: 'delete',
          url: `/api/todos/${todoId}`,
        })
        this.todos = this.todos.filter((todo) => todo.id !== todoId)
      })
    },
  },
})

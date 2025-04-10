import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
    tasks: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    setUser(state, user) {
      state.user = user
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const res = await axios.post('http://localhost:8000/api/login', credentials)
      commit('setToken', res.data.token)
    },
    async fetchUser({ commit, state }) {
      const res = await axios.get('http://localhost:8000/api/me', {
        headers: { Authorization: `Bearer ${state.token}` }
      })
      commit('setUser', res.data)
    },
    async fetchTasks({ commit, state }) {
      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${state.token}` }
      })
      commit('setTasks', res.data)
    }
  }
})

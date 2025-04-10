<template>
  <div class="container-fluid py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">👋 Hello, {{ user?.name || 'Guest' }}</h2>
      <router-link to="/tasks/create" class="btn btn-primary shadow-sm">
        <i class="bi bi-plus-circle me-1"></i> Add Task
      </router-link>
    </div>

    <!-- Task Table -->
    <div class="card shadow-sm border-0 w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">📋 All Tasks</h5>
        <div class="table-responsive w-100">
          <table class="table table-hover align-middle text-nowrap w-100">
            <thead class="table-light">
              <tr>
                <th style="min-width: 150px;">Title</th>
                <th style="min-width: 100px;">Status</th>
                <th style="min-width: 120px;">Due Date</th>
                <th style="min-width: 300px;">Description</th>
                <th class="text-center" style="min-width: 200px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tasks.length === 0">
                <td colspan="5" class="text-center text-muted py-4">
                  <i class="bi bi-inbox fs-3 me-2"></i>No tasks found.
                </td>
              </tr>
              <tr v-for="task in tasks" :key="task.id">
                <td class="fw-semibold">{{ task.title }}</td>
                <td>
                  <span
                    class="badge"
                    :class="task.status ? 'bg-success' : 'bg-warning text-dark'"
                  >
                    {{ task.status ? 'Completed' : 'Pending' }}
                  </span>
                </td>
                <td>{{ formatDate(task.due_date) }}</td>
                <td>{{ truncate(task.description, 50) }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-outline-info me-2"
                    @click="viewTask(task.id)"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-warning me-2"
                    @click="editTask(task.id)"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger me-2"
                    @click="deleteTask(task.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                  <button
                    v-if="!task.status"
                    class="btn btn-sm btn-success"
                    @click="markAsComplete(task.id)"
                    title="Mark as Complete"
                  >
                    <i class="bi bi-check2-circle"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashboardView',
  data() {
    return {
      tasks: [],
      user: null
    }
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.tasks = response.data
      } catch (error) {
        console.error('Failed to fetch tasks', error)
      }
    },
    async fetchUser() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user profile', error)
      }
    },
    viewTask(id) {
      this.$router.push(`/tasks/${id}`)
    },
    editTask(id) {
      this.$router.push(`/tasks/${id}/edit`)
    },
    async deleteTask(id) {
      if (!confirm('Are you sure you want to delete this task?')) return
      try {
        const token = localStorage.getItem('token')
        await axios.delete(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.fetchTasks()
      } catch (error) {
        console.error('Failed to delete task', error)
      }
    },
    async markAsComplete(id) {
      try {
        const token = localStorage.getItem('token')
        await axios.patch(
          `/tasks/${id}`,
          { status: true },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.fetchTasks()
      } catch (error) {
        console.error('Failed to mark task as complete', error)
      }
    },
    formatDate(date) {
      const d = new Date(date)
      return d.toLocaleDateString()
    },
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text
    }
  },
  mounted() {
    this.fetchTasks()
    this.fetchUser()
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.85rem;
  padding: 0.4em 0.6em;
}
</style>

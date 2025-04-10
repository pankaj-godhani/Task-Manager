<template>
  <div class="container py-4">
    <h3 class="mb-4">Task Details</h3>

    <div v-if="task" class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <p class="card-text"><strong>Status:</strong> {{ task.status ? 'Completed' : 'Pending' }}</p>
        <p class="card-text"><strong>Due Date:</strong> {{ task.due_date }}</p>
        <p class="card-text"><strong>Description:</strong> {{ task.description }}</p>
        <router-link to="/tasks" class="btn btn-secondary mt-3">Back to Tasks</router-link>
      </div>
    </div>

    <div v-else class="text-muted">Loading task...</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskShowView',
  data() {
    return {
      task: null
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const id = this.$route.params.id
    try {
      const response = await axios.get(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.task = response.data
    } catch (error) {
      console.error('Failed to load task', error)
    }
  }
}
</script>

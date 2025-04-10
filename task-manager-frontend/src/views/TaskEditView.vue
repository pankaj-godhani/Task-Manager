<template>
  <div class="container py-4">
    <h3 class="mb-4">Edit Task</h3>

    <form @submit.prevent="updateTask">
      <!-- Title Field -->
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          v-model="task.title"
          class="form-control"
          required
          :class="{'is-invalid': errors.title}"
        />
        <div v-if="errors.title" class="invalid-feedback">{{ errors.title[0] }}</div>
      </div>

      <!-- Description Field -->
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea
          v-model="task.description"
          class="form-control"
          rows="3"
        ></textarea>
        <div v-if="errors.description" class="invalid-feedback">{{ errors.description[0] }}</div>
      </div>

      <!-- Due Date Field -->
      <div class="mb-3">
        <label class="form-label">Due Date</label>
        <input
          type="date"
          v-model="task.due_date"
          class="form-control"
        />
        <div v-if="errors.due_date" class="invalid-feedback">{{ errors.due_date[0] }}</div>
      </div>

      <!-- Status Field -->
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="task.status"
        />
        <label class="form-check-label">Mark as Completed</label>
      </div>

      <button type="submit" class="btn btn-success">Update Task</button>
      <router-link to="/tasks" class="btn btn-secondary ms-2">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskEditView',
  data() {
    return {
      task: {
        title: '',
        description: '',
        due_date: '',
        status: false
      },
      errors: {} // To hold the validation errors
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
  },
  methods: {
    async updateTask() {
      const token = localStorage.getItem('token')
      const id = this.$route.params.id
      try {
        // Clear previous errors before submitting
        this.errors = {}

        // Send PUT request to update task
        await axios.put(`/tasks/${id}`, this.task, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.$router.push('/tasks') // Redirect to tasks page
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // Capture backend validation errors
          this.errors = error.response.data.errors
        } else {
          console.error('Failed to update task', error)
        }
      }
    }
  }
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>

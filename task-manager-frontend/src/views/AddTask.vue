<template>
  <div class="container py-5">
    <h2>Add New Task</h2>
    <form @submit.prevent="submitTask" class="card p-4 shadow-sm">
      <!-- Title Field -->
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          v-model="task.title"
          type="text"
          class="form-control"
          :class="{'is-invalid': errors.title}"
        />
        <div v-if="errors.title" class="invalid-feedback">{{ errors.title[0] }}</div>
      </div>

      <!-- Description Field -->
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="task.description" class="form-control"></textarea>
        <div v-if="errors.description" class="invalid-feedback">{{ errors.description[0] }}</div>
      </div>

      <!-- Due Date Field -->
      <div class="mb-3">
        <label class="form-label">Due Date</label>
        <input v-model="task.due_date" type="date" class="form-control" />
        <div v-if="errors.due_date" class="invalid-feedback">{{ errors.due_date[0] }}</div>
      </div>

      <!-- Status Field -->
      <div class="mb-3">
        <label class="form-label">Status</label>
        <select v-model="task.status" class="form-select">
          <option :value="false">Pending</option>
          <option :value="true">Completed</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary w-100">Create Task</button>

      <!-- Success Message -->
      <p v-if="message" class="mt-3 text-success">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        due_date: '',
        status: false
      },
      message: '',
      errors: {} // Holds validation errors
    }
  },
  methods: {
    async submitTask() {
      try {
        // Clear previous errors and message before submitting
        this.errors = {}
        this.message = ''

        // Send the POST request to the server to create a new task
        await axios.post('/tasks', this.task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        // If successful, show the success message and redirect to task list
        this.message = 'Task added successfully!'
        this.$router.push('/tasks')
      } catch (err) {
        if (err.response && err.response.data) {
          // Capture backend validation errors and display them
          this.errors = err.response.data.errors || {}
        } else {
          console.error(err)
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

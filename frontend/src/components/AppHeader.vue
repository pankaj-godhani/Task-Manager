<!-- src/components/AppHeader.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">Task Manager</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <NavLinks />
      </div>
    </div>
  </nav>
</template>

<script>
import NavLinks from './NavLinks.vue'

export default {
  name: 'AppHeader',
  components: {
    NavLinks
  }
}
</script>

<style scoped>
.navbar {
  z-index: 1000;
}
</style>

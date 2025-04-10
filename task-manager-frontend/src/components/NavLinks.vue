<template>
  <ul class="navbar-nav">
    <li v-for="link in filteredLinks" :key="link.name" class="nav-item">
      <router-link
        v-if="link.path"
        :to="link.path"
        class="nav-link d-flex align-items-center"
      >
        <i :class="`bi bi-${link.icon}`"></i>
        <span class="ms-2">{{ link.name }}</span>
      </router-link>

      <button
        v-else-if="link.action === 'logout'"
        class="nav-link btn btn-link d-flex align-items-center"
        @click="logout"
      >
        <i :class="`bi bi-${link.icon}`"></i>
        <span class="ms-2">{{ link.name }}</span>
      </button>
    </li>
  </ul>
</template>

<script>
import navLinks from '@/config/navLinks'

export default {
  name: 'NavLinks',
  computed: {
    filteredLinks() {
      const isAuthenticated = !!localStorage.getItem('token')
      return navLinks.filter(link => {
        if (link.requiresAuth && !isAuthenticated) return false
        if (!link.requiresAuth && isAuthenticated) return false
        return true
      })
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      window.location.href = '/login' // force reload
    }
  }
}
</script>

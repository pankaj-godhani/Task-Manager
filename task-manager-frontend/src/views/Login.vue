<template>
  <div>
    <div
      class="container d-flex justify-content-center align-items-center min-vh-100"
    >
      <div class="card p-4 shadow-lg" style="max-width: 500px; width: 100%">
        <div class="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Login"
            class="img-fluid"
            style="max-width: 100px"
          />
          <h2 class="mt-3">Welcome Back</h2>
        </div>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
            />
            <div v-if="fieldErrors.email" class="text-danger small mt-1">
              {{ fieldErrors.email[0] }}
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
            />
            <div v-if="fieldErrors.password" class="text-danger small mt-1">
              {{ fieldErrors.password[0] }}
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100">Login</button>

          <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      error: "",
      fieldErrors: {},
    };
  },
  methods: {
    async loginUser() {
      this.error = "";
      this.fieldErrors = {};

      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", response.data.token);

        // Force redirect with reload
        window.location.href = "/tasks";
      } catch (err) {
        if (err.response?.data?.errors) {
          this.fieldErrors = err.response.data.errors;
        } else {
          this.error = err.response?.data?.error || "Login failed";
        }
      }
    },
  },
};
</script>

<style scoped>
body {
  background: #f8f9fa;
}

.card {
  border-radius: 1rem;
}
</style>

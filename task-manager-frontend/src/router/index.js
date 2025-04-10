import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import AddTask from '../views/AddTask.vue'
import TaskShowView from '@/views/TaskShowView.vue'
import TaskEditView from '@/views/TaskEditView.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/tasks',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
        path: '/tasks/create',
        name: 'AddTask',
        component: AddTask,
        meta: { requiresAuth: true }
      },
      {
        path: '/tasks/:id',
        name: 'TaskShow',
        component: TaskShowView,
        meta: { requiresAuth: true }
      },
      {
        path: '/tasks/:id/edit',
        name: 'TaskEdit',
        component: TaskEditView,
        meta: { requiresAuth: true }
      },

    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')

    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
      next('/tasks') // prevent logged-in users from accessing login/register
    } else {
      next()
    }
  })


export default router

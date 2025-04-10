// src/config/navLinks.js
export default [
    {
        name: 'Login',
        path: '/login',
        icon: 'box-arrow-in-right'
    },
    {
        name: 'Register',
        path: '/register',
        icon: 'person-plus'
    },
    {
        name: 'Dashboard',
        path: '/tasks',
        icon: 'speedometer',
        requiresAuth: true
    },
    {
        name: 'Logout',
        action: 'logout',
        icon: 'box-arrow-right',
        requiresAuth: true
    },

]

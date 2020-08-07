import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/auth/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/board/BoardAdmin.vue')
  },
  {
    path: '/mod',
    name: 'moderator',
    // lazy-loaded
    component: () => import('../views/board/BoardModerator.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('../views/board/BoardUser.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  console.log(authRequired, loggedIn)

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router

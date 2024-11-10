import { createRouter, createWebHistory } from 'vue-router'
import { menuItems } from '../data/menuItems'
import Home from '../views/Home.vue'

const routes = menuItems.map(item => ({
  path: item.id === 'home' ? '/' : `/${item.id}`,
  name: item.id,
  component: Home
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
<template>
    <nav class="w-64 bg-[#121212] shadow-md flex flex-col h-full">
      <ul class="flex-1 py-2 overflow-auto">
        <template v-if="isLoggedIn && menuItems.length > 0">
          <li v-for="item in menuItems" :key="item.id">
            <router-link
              :to="{ name: item.id }"
              class="flex items-center px-6 py-4 text-lg font-semibold transition-colors duration-150 ease-in-out"
              :class="{
                'bg-[#1f1f1f] text-white': isActive(item.id),
                'text-gray-400 hover:bg-[#1f1f1f] hover:text-white': !isActive(item.id)
              }"
            >
              <component :is="item.icon" class="h-6 w-6 mr-4" :class="{
                'text-white': isActive(item.id),
                'text-gray-400': !isActive(item.id)
              }" />
              <span>{{ translations[language][item.id] }}</span>
            </router-link>
          </li>
        </template>
        <li v-else>
          <CreateFirstNavigation />
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { computed, inject } from 'vue'
  import { useRoute } from 'vue-router'
  import { menuItems } from '../data/menuItems'
  import CreateFirstNavigation from './CreateFirstNavigation.vue'
  
  export default {
    name: 'Sidebar',
    components: {
      CreateFirstNavigation
    },
    setup() {
      const route = useRoute()
      const languageStore = inject('language')
      const authStore = inject('auth')
      const language = computed(() => languageStore.language)
      const isLoggedIn = computed(() => authStore.isLoggedIn)
  
      const isActive = computed(() => (id) => route.name === id)
  
      const translations = {
        en: {
          home: 'Home',
          work: 'Work',
          education: 'Education',
          leisure: 'Leisure'
        },
        zh: {
          home: '首页',
          work: '工作',
          education: '教育',
          leisure: '休闲'
        }
      }
  
      return {
        menuItems,
        isActive,
        language,
        translations,
        isLoggedIn
      }
    }
  }
  </script>
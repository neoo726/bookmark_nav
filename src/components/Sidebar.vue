<template>
    <nav class="w-64 bg-white shadow-md flex flex-col h-full">
      <ul class="flex-1 py-2 overflow-auto">
        <li v-for="item in menuItems" :key="item.id">
          <router-link
            :to="{ name: item.id }"
            class="flex items-center px-6 py-4 text-lg font-semibold transition-colors duration-150 ease-in-out"
            :class="{
              'bg-blue-50 text-blue-600': isActive(item.id),
              'text-gray-700 hover:bg-gray-100': !isActive(item.id)
            }"
          >
            <component :is="item.icon" class="h-6 w-6 mr-4" :class="{
              'text-blue-600': isActive(item.id),
              'text-gray-400': !isActive(item.id)
            }" />
            <span>{{ translations[language][item.id] }}</span>
            <div v-if="isActive(item.id)" class="ml-auto w-1.5 h-6 bg-blue-600 rounded-full" />
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { computed, inject } from 'vue'
  import { useRoute } from 'vue-router'
  import { menuItems } from '../data/menuItems'
  
  export default {
    name: 'Sidebar',
    setup() {
      const route = useRoute()
      const languageStore = inject('language')
      const language = computed(() => languageStore.language)
  
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
        translations
      }
    }
  }
  </script>
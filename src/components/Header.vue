<template>
    <header class="bg-white shadow-md w-full">
      <div class="mx-auto h-16 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center">
          <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
          <h1 class="text-xl font-bold ml-2">Bookmark Navigator</h1>
        </div>
        <div class="flex items-center space-x-4">
          <select v-model="language" class="border rounded px-2 py-1">
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
          <button v-if="!user" @click="login" class="bg-blue-500 text-white px-4 py-2 rounded">
            {{ language === 'en' ? 'Login' : '登录' }}
          </button>
          <div v-else class="flex items-center space-x-2">
            <img :src="user.avatar" alt="User Avatar" class="h-8 w-8 rounded-full" />
            <span>{{ user.name }}</span>
            <button @click="logout" class="text-red-500">
              {{ language === 'en' ? 'Logout' : '登出' }}
            </button>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import { ref, inject, computed } from 'vue'
  
  export default {
    name: 'Header',
    setup() {
      const languageStore = inject('language')
      const language = computed({
        get: () => languageStore.language,
        set: (value) => languageStore.setLanguage(value)
      })
      const user = ref(null)
  
      const login = () => {
        // Implement login logic here
        user.value = { name: 'John Doe', avatar: 'https://example.com/avatar.jpg' }
      }
  
      const logout = () => {
        user.value = null
      }
  
      return {
        language,
        user,
        login,
        logout
      }
    }
  }
  </script>
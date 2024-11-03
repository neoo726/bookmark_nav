<script setup lang="ts">
import { ref } from 'vue'
import { XIcon } from 'lucide-vue-next'

const emit = defineEmits(['close', 'login'])

const username = ref('')
const password = ref('')
const error = ref('')

const login = () => {
  if (username.value === 'test' && password.value === 'test') {
    emit('login', { name: 'Test User', email: 'test@example.com' })
  } else {
    error.value = '用户名或密码错误'
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold dark:text-white">登录</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <XIcon class="h-5 w-5" />
        </button>
      </div>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
          <input v-model="username" id="username" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密码</label>
          <input v-model="password" id="password" type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        </div>
        <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          登录
        </button>
      </form>
    </div>
  </div>
</template>
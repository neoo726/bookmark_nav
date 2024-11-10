<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-[#1f1f1f] p-6 rounded-lg shadow-xl w-96">
        <h2 class="text-2xl font-bold mb-4 text-white">注册</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-300">邮箱</label>
            <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 bg-[#2f2f2f] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#69bfff]">
          </div>
          <div class="mb-4 relative">
            <label for="password" class="block text-sm font-medium text-gray-300">密码</label>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="password" 
              required 
              class="mt-1 block w-full px-3 py-2 bg-[#2f2f2f] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#69bfff]"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Eye v-if="!showPassword" class="h-5 w-5" />
              <EyeOff v-else class="h-5 w-5" />
            </button>
          </div>
          <div class="mb-6 relative">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300">确认密码</label>
            <input 
              :type="showConfirmPassword ? 'text' : 'password'" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              required 
              class="mt-1 block w-full px-3 py-2 bg-[#2f2f2f] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#69bfff]"
            >
            <button 
              type="button" 
              @click="showConfirmPassword = !showConfirmPassword" 
              class="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Eye v-if="!showConfirmPassword" class="h-5 w-5" />
              <EyeOff v-else class="h-5 w-5" />
            </button>
          </div>
          <button type="submit" class="w-full bg-[#69bfff] text-white py-2 px-4 rounded-md hover:bg-[#5aa8e6] transition-colors">注册</button>
        </form>
        <div class="mt-4 flex justify-between items-center">
          <button @click="$emit('switch-to-login')" class="text-[#69bfff] hover:underline">已有账号？登录</button>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white">关闭</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Eye, EyeOff } from 'lucide-vue-next'
  
  export default {
    name: 'RegisterModal',
    components: {
      Eye,
      EyeOff
    },
    props: {
      show: Boolean
    },
    emits: ['close', 'switch-to-login'],
    setup(props, { emit }) {
      const email = ref('')
      const password = ref('')
      const confirmPassword = ref('')
      const showPassword = ref(false)
      const showConfirmPassword = ref(false)
  
      const handleRegister = () => {
        if (password.value !== confirmPassword.value) {
          alert('密码不匹配')
          return
        }
        // Implement register logic here
        console.log('Register attempt', email.value, password.value)
        // After successful registration:
        // emit('close')
      }
  
      return {
        email,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        handleRegister
      }
    }
  }
  </script>
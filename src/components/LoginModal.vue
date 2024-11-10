<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-[#1f1f1f] p-6 rounded-lg shadow-xl w-96">
        <h2 class="text-2xl font-bold mb-4 text-white">登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-300">邮箱</label>
            <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 bg-[#2f2f2f] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#69bfff]">
          </div>
          <div class="mb-6 relative">
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
          <button type="submit" class="w-full bg-[#69bfff] text-white py-2 px-4 rounded-md hover:bg-[#5aa8e6] transition-colors">登录</button>
        </form>
        <div class="mt-4 flex justify-between items-center">
          <button @click="$emit('switch-to-register')" class="text-[#69bfff] hover:underline">注册新账号</button>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white">关闭</button>
        </div>
        <div class="mt-6">
          <p class="text-center text-gray-400 mb-2">或使用以下方式登录</p>
          <div class="flex justify-center space-x-4">
            <button @click="socialLogin('google')" class="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
              Google
            </button>
            <button @click="socialLogin('github')" class="bg-[#333] text-white py-2 px-4 rounded-md hover:bg-[#444] transition-colors">
              GitHub
            </button>
            <button @click="socialLogin('wechat')" class="bg-[#7BB32E] text-white py-2 px-4 rounded-md hover:bg-[#6AA21D] transition-colors">
              微信
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Eye, EyeOff } from 'lucide-vue-next'
  
  export default {
    name: 'LoginModal',
    components: {
      Eye,
      EyeOff
    },
    props: {
      show: Boolean
    },
    emits: ['close', 'switch-to-register'],
    setup(props, { emit }) {
      const email = ref('')
      const password = ref('')
      const showPassword = ref(false)
  
      const handleLogin = () => {
        // Implement login logic here
        console.log('Login attempt', email.value, password.value)
        // After successful login:
        // emit('close')
      }
  
      const socialLogin = (provider) => {
        // Implement social login logic here
        console.log('Social login attempt with', provider)
        // After successful login:
        // emit('close')
      }
  
      return {
        email,
        password,
        showPassword,
        handleLogin,
        socialLogin
      }
    }
  }
  </script>
<template>
    <header class="bg-black text-white w-full">
      <div class="mx-auto h-16 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center">
          <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
          <h1 class="text-xl font-bold ml-2">Bookmark Navigator</h1>
        </div>
        
        <div class="w-1/4 mx-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="language === 'en' ? 'Search bookmarks...' : '搜索书签...'"
              class="w-full pl-11 pr-4 h-12 bg-[#242424] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white text-base"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <XIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
  
        <div class="flex items-center space-x-4">
          <select v-model="language" class="bg-[#242424] text-white border border-[#333333] rounded px-2 py-1 text-base">
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
          <button
            @click="showRegisterModal = true"
            class="text-gray-400 hover:text-white hover:font-bold transition-all duration-200"
          >
            {{ language === 'en' ? 'Register' : '注册' }}
          </button>
          <button
            v-if="!user"
            @click="showLoginModal = true"
            class="bg-white text-black font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            {{ language === 'en' ? 'Login' : '登录' }}
          </button>
          <div v-else class="flex items-center space-x-2">
            <img :src="user.avatar" alt="User Avatar" class="h-8 w-8 rounded-full" />
            <span>{{ user.name }}</span>
            <button @click="logout" class="text-white hover:text-gray-300">
              {{ language === 'en' ? 'Logout' : '登出' }}
            </button>
          </div>
        </div>
      </div>
      <LoginModal 
        :show="showLoginModal" 
        @close="showLoginModal = false"
        @switch-to-register="showLoginModal = false; showRegisterModal = true"
      />
      <RegisterModal 
        :show="showRegisterModal" 
        @close="showRegisterModal = false"
        @switch-to-login="showRegisterModal = false; showLoginModal = true"
      />
    </header>
  </template>
  
  <script>
  import { ref, computed, inject } from 'vue'
  import { XIcon, Search } from 'lucide-vue-next'
  import LoginModal from './LoginModal.vue'
  import RegisterModal from './RegisterModal.vue'
  
  export default {
    name: 'Header',
    components: {
      XIcon,
      Search,
      LoginModal,
      RegisterModal
    },
    setup() {
      const languageStore = inject('language')
      const authStore = inject('auth')
      const searchStore = inject('search')
      
      const language = computed({
        get: () => languageStore.language,
        set: (value) => languageStore.setLanguage(value)
      })
      
      const searchQuery = computed({
        get: () => searchStore.query,
        set: (value) => searchStore.setQuery(value)
      })
  
      const user = computed(() => authStore.user)
  
      const showLoginModal = ref(false)
      const showRegisterModal = ref(false)
  
      const login = () => authStore.login()
      const logout = () => authStore.logout()
      const register = () => authStore.register()
      const clearSearch = () => searchStore.clearQuery()
  
      return {
        language,
        user,
        searchQuery,
        login,
        logout,
        register,
        clearSearch,
        showLoginModal,
        showRegisterModal
      }
    }
  }
  </script>
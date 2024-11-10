<template>
  <div class="flex flex-col h-screen bg-[#121212] text-white">
    <Header />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar :onLogin="handleLogin" :onRegister="handleRegister"/>
      <main class="flex-1 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
    <Footer />
    <LoginModal 
      :show="showLoginModal" 
      @close="showLoginModal = false"
      @switch-to-register="handleRegister"
    />
    <RegisterModal 
      :show="showRegisterModal" 
      @close="showRegisterModal = false"
      @switch-to-login="handleLogin"
    />
  </div>
</template>

<script>
import { provide, ref } from 'vue'
import { useLanguageStore } from './stores/language'
import { useAuthStore } from './stores/auth'
import { useSearchStore } from './stores/search'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'
import RegisterModal from './components/RegisterModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer,
    LoginModal,
    RegisterModal
  },
  setup() {
    const languageStore = useLanguageStore()
    const authStore = useAuthStore()
    const searchStore = useSearchStore()

    const showLoginModal = ref(false)
    const showRegisterModal = ref(false)

    const handleLogin = () => {
      showLoginModal.value = true
      showRegisterModal.value = false
    }

    const handleRegister = () => {
      showLoginModal.value = false
      showRegisterModal.value = true
    }

    provide('language', languageStore)
    provide('auth', authStore)
    provide('search', searchStore)

    return {
      showLoginModal,
      showRegisterModal,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #121212;
}
</style>
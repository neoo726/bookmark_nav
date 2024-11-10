<template>
  <div class="flex flex-col h-screen bg-[#121212] text-white">
    <Header />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />
      <main class="flex-1 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import { provide } from 'vue'
import { useLanguageStore } from './stores/language'
import { useAuthStore } from './stores/auth'
import { useSearchStore } from './stores/search'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer
  },
  setup() {
    const languageStore = useLanguageStore()
    const authStore = useAuthStore()
    const searchStore = useSearchStore()

    provide('language', languageStore)
    provide('auth', authStore)
    provide('search', searchStore)

    return {}
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
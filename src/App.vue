<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />
      <main class="flex-1 p-6 bg-gray-50 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import { provide } from 'vue'
import { useLanguageStore } from './stores/language'
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
    provide('language', languageStore)
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
}
</style>
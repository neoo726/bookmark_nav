<template>
  <div class="relative" ref="container">
    <div class="m-4 p-4 border-2 border-[#1f1f1f] rounded-lg bg-[#1f1f1f] text-white">
      <h3 class="text-lg font-semibold mb-2">{{ translations[language].title }}</h3>
      <p class="text-sm text-gray-400 mb-4">{{ translations[language].description }}</p>
      <button
        @click="handleCreate"
        class="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors font-bold"
      >
        {{ translations[language].buttonText }}
      </button>
    </div>
    <LoginPrompt 
      v-if="showLoginPrompt" 
      :position="promptPosition"
      @close="showLoginPrompt = false" 
      @login="login" 
    />
  </div>
</template>

<script>
import { ref, computed, inject, defineAsyncComponent } from 'vue'

export default {
  name: 'CreateFirstNavigation',
  components: {
    LoginPrompt: defineAsyncComponent(() => import('./LoginPrompt.vue'))
  },
  setup(props, { emit }) {
    const languageStore = inject('language')
    const authStore = inject('auth')
    const language = computed(() => languageStore.language)
    const showLoginPrompt = ref(false)
    const container = ref(null)
    const promptPosition = ref({ x: 0, y: 0 })

    const translations = {
      en: {
        title: 'Create your first navigation list',
        description: 'Start organizing your bookmarks by creating a navigation list.',
        buttonText: 'Create Navigation'
      },
      zh: {
        title: '创建你的第一个导航列表',
        description: '通过创建导航列表开始组织你的书签。',
        buttonText: '创建导航'
      }
    }

    const handleCreate = () => {
      if (!authStore.isLoggedIn) {
        const rect = container.value.getBoundingClientRect()
        promptPosition.value = {
          x: rect.right + 8,
          y: rect.top + window.scrollY
        }
        showLoginPrompt.value = true
      } else {
        // 处理创建导航的逻辑
        console.log('Creating navigation...')
      }
    }

    const login = () => {
      showLoginPrompt.value = false
      emit('login')
    }

    return {
      language,
      translations,
      handleCreate,
      showLoginPrompt,
      login,
      container,
      promptPosition
    }
  }
}
</script>
<template>
    <a :href="url" target="_blank" rel="noopener noreferrer" class="block">
      <div class="bg-[#1f1f1f] rounded-lg shadow-md overflow-hidden hover:bg-[#282828] transition-colors duration-300">
        <div class="p-4 flex items-start space-x-4">
          <div class="flex-shrink-0 w-10 h-10 relative">
            <img v-if="!imageError" :src="icon" :alt="`${name} icon`" @error="imageError = true" class="w-full h-full object-contain rounded" />
            <div v-else class="w-full h-full bg-gray-700 rounded flex items-center justify-center">
              <component :is="Globe" class="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-base font-bold text-white truncate">{{ name }}</p>
            <p class="text-xs text-gray-400 truncate mt-1">{{ description }}</p>
          </div>
        </div>
      </div>
    </a>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Globe } from 'lucide-vue-next'
  
  export default {
    name: 'BookmarkCard',
    props: {
      name: String,
      description: String,
      url: String,
      icon: String
    },
    setup() {
      const imageError = ref(false)
  
      return {
        imageError,
        Globe
      }
    }
  }
  </script>
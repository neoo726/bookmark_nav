<template>
    <div class="container mx-auto px-6 py-6">
      <div v-for="(group, groupId) in filteredBookmarks" :key="groupId" class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-white">{{ group.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <BookmarkCard
            v-for="bookmark in group.bookmarks"
            :key="bookmark.id"
            :name="bookmark.name"
            :url="bookmark.url"
            :description="bookmark.description"
            :icon="bookmark.icon"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, inject } from 'vue'
  import { useRoute } from 'vue-router'
  import BookmarkCard from '@/components/BookmarkCard.vue'
  import { sampleBookmarks, userBookmarks } from '@/data/bookmarks'
  
  export default {
    name: 'Home',
    components: {
      BookmarkCard
    },
    setup() {
      const route = useRoute()
      const searchStore = inject('search')
      const authStore = inject('auth')
  
      const filteredBookmarks = computed(() => {
        const categoryId = route.name
        let categoryBookmarks = authStore.isLoggedIn ? userBookmarks : sampleBookmarks
        
        if (categoryId && categoryId !== 'home' && categoryBookmarks[categoryId]) {
          categoryBookmarks = { [categoryId]: categoryBookmarks[categoryId] }
        }
        
        return searchStore.filteredBookmarks(categoryBookmarks)
      })
  
      return {
        filteredBookmarks
      }
    }
  }
  </script>
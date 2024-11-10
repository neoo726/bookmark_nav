<template>
    <div class="container mx-auto px-4 py-8">
      <div v-for="(group, groupId) in bookmarkGroups" :key="groupId" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">{{ getGroupTitle(groupId) }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <BookmarkCard
            v-for="bookmark in group"
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
  import { bookmarks } from '@/data/bookmarks'
  
  export default {
    name: 'Home',
    components: {
      BookmarkCard
    },
    setup() {
      const route = useRoute()
      const languageStore = inject('language')
      const language = computed(() => languageStore.language)
  
      const translations = {
        en: {
          home: 'All Bookmarks',
          work: 'Work Bookmarks',
          education: 'Education Bookmarks',
          leisure: 'Leisure Bookmarks'
        },
        zh: {
          home: '所有书签',
          work: '工作书签',
          education: '教育书签',
          leisure: '休闲书签'
        }
      }
  
      const bookmarkGroups = computed(() => {
        const categoryId = route.name
        if (categoryId === 'home') {
          return bookmarks
        } else {
          return { [categoryId]: bookmarks[categoryId] }
        }
      })
  
      const getGroupTitle = (groupId) => {
        return translations[language.value][groupId]
      }
  
      return {
        bookmarkGroups,
        getGroupTitle
      }
    }
  }
  </script>
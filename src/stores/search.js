import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: ''
  }),
  actions: {
    setQuery(query) {
      this.query = query
    },
    clearQuery() {
      this.query = ''
    }
  },
  getters: {
    filteredBookmarks: (state) => (bookmarks) => {
      if (!state.query) return bookmarks
      
      const query = state.query.toLowerCase()
      const filtered = {}
      
      Object.entries(bookmarks).forEach(([key, category]) => {
        const filteredBookmarks = category.bookmarks.filter(bookmark => 
          bookmark.name.toLowerCase().includes(query) ||
          bookmark.description.toLowerCase().includes(query)
        )
        
        if (filteredBookmarks.length > 0) {
          filtered[key] = {
            ...category,
            bookmarks: filteredBookmarks
          }
        }
      })
      
      return filtered
    }
  }
})
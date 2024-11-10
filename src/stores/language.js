import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'en'
  }),
  actions: {
    setLanguage(lang) {
      this.language = lang
    }
  }
})
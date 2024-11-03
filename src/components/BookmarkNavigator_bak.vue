<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { SearchIcon, SettingsIcon, CheckIcon, SunIcon, MoonIcon, XIcon, StarIcon, EditIcon, Trash2Icon, UploadIcon, MessageSquareIcon, ClockIcon, GlobeIcon } from 'lucide-vue-next'

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface Bookmark {
  id: number;
  name: string;
  description: string;
  url: string;
  isEditing: boolean;
  isPinned: boolean;
}

interface BookmarkGroup {
  id: number;
  title: string;
  isEditing: boolean;
  isPinned: boolean;
  bookmarks: Bookmark[];
}

const isEditMode = ref(false)
const searchTerm = ref('')
const showUserMenu = ref(false)
const language = ref('zh')
const isDarkMode = ref(false)
const hoveredBookmark = ref<Bookmark | null>(null)
const hoverPosition = ref({ x: 0, y: 0 })
const hoverTimer = ref<number | null>(null)
const showFeedbackModal = ref(false)
const showVersionHistory = ref(false)
const feedbackText = ref('')
const showLanguageMenu = ref(false)

const user = ref<User>({
  name: '张三',
  email: 'zhangsan@example.com'
})

const bookmarkGroups = ref<BookmarkGroup[]>([
  {
    id: 1,
    title: "社交媒体",
    isEditing: false,
    isPinned: false,
    bookmarks: [
      { id: 1, name: "微博", description: "中国领先的社交媒体平台", url: "https://weibo.com", isEditing: false, isPinned: false },
      { id: 2, name: "知乎", description: "问答社区", url: "https://www.zhihu.com", isEditing: false, isPinned: false },
      { id: 3, name: "豆瓣", description: "书影音分享平台", url: "https://www.douban.com", isEditing: false, isPinned: false },
    ]
  },
  {
    id: 2,
    title: "新闻资讯",
    isEditing: false,
    isPinned: false,
    bookmarks: [
      { id: 4, name: "新浪新闻", description: "综合新闻门户", url: "https://news.sina.com.cn", isEditing: false, isPinned: false },
      { id: 5, name: "澎湃新闻", description: "时政与思想新闻", url: "https://www.thepaper.cn", isEditing: false, isPinned: false },
      { id: 6, name: "36氪", description: "科技创投资讯", url: "https://36kr.com", isEditing: false, isPinned: false },
    ]
  },
])

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const startEditingGroup = (group: BookmarkGroup) => {
  group.isEditing = true
  nextTick(() => {
    const input = document.querySelector(`input[value="${group.title}"]`) as HTMLInputElement
    if (input) {
      input.focus()
      input.select()
    }
  })
}

const finishEditingGroup = (group: BookmarkGroup) => {
  group.isEditing = false
}

const editBookmark = (bookmark: Bookmark) => {
  bookmark.isEditing = !bookmark.isEditing
  if (bookmark.isEditing) {
    nextTick(() => {
      const input = document.querySelector(`input[value="${bookmark.name}"]`) as HTMLInputElement
      if (input) {
        input.focus()
        input.select()
      }
    })
  }
}

const focusBookmarkDescription = (bookmark: Bookmark) => {
  nextTick(() => {
    const input = document.querySelector(`input[value="${bookmark.description}"]`) as HTMLInputElement
    if (input) input.focus()
  })
}

const focusBookmarkUrl = (bookmark: Bookmark) => {
  nextTick(() => {
    const input = document.querySelector(`input[value="${bookmark.url}"]`) as HTMLInputElement
    if (input) input.focus()
  })
}

const finishEditingBookmark = (bookmark: Bookmark) => {
  bookmark.isEditing = false
}

const deleteBookmark = (groupId: number, bookmarkId: number) => {
  const groupIndex = bookmarkGroups.value.findIndex(g => g.id === groupId)
  if (groupIndex !== -1) {
    bookmarkGroups.value[groupIndex].bookmarks = bookmarkGroups.value[groupIndex].bookmarks.filter(b => b.id !== bookmarkId)
  }
}

const deleteGroup = (groupId: number) => {
  bookmarkGroups.value = bookmarkGroups.value.filter(g => g.id !== groupId)
}

const addBookmark = (groupId: number) => {
  const group = bookmarkGroups.value.find(g => g.id === groupId)
  if (group) {
    const newId = Math.max(...group.bookmarks.map(b => b.id), 0) + 1
    const newBookmark: Bookmark = {
      id: newId,
      name: t('newBookmark'),
      description: t('editDescription'),
      url: "",
      isEditing: true,
      isPinned: false
    }
    group.bookmarks.push(newBookmark)
    nextTick(() => {
      const input = document.querySelector(`input[value="${newBookmark.name}"]`) as HTMLInputElement
      if (input) {
        input.focus()
        input.select()
      }
    })
  }
}

const addGroup = () => {
  const newId = Math.max(...bookmarkGroups.value.map(g => g.id), 0) + 1
  const newGroup: BookmarkGroup = {
    id: newId,
    title: t('newGroup'),
    isEditing: true,
    isPinned: false,
    bookmarks: []
  }
  bookmarkGroups.value.push(newGroup)
  nextTick(() => {
    const input = document.querySelector(`input[value="${newGroup.title}"]`) as HTMLInputElement
    if (input) {
      input.focus()
      input.select()
    }
  })
}

const openBookmark = (url: string) => {
  if (!isEditMode.value) {
    window.open(url, '_blank')
  }
}

const startHoverTimer = (bookmark: Bookmark, event: MouseEvent) => {
  clearHoverTimer()
  hoverTimer.value = window.setTimeout(() => {
    hoveredBookmark.value = bookmark
    updateHoverPosition(event)
  }, 1000)
}

const clearHoverTimer = () => {
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }
  hoveredBookmark.value = null
}

const updateHoverPosition = (event: MouseEvent) => {
  if (hoveredBookmark.value) {
    const margin = 10
    const tooltipWidth = 200 // Estimated tooltip width
    const tooltipHeight = 30 // Estimated tooltip height

    let x = event.clientX + margin
    let y = event.clientY + margin

    // Check right boundary
    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth - margin
    }

    // Check bottom boundary
    if (y + tooltipHeight > window.innerHeight) {
      y = event.clientY - tooltipHeight - margin
    }

    hoverPosition.value = { x, y }
  }
}

const clearSearch = () => {
  searchTerm.value = ''
}

const toggleGroupPin = (group: BookmarkGroup) => {
  group.isPinned = !group.isPinned
}

const toggleBookmarkPin = (group: BookmarkGroup, bookmark: Bookmark) => {
  bookmark.isPinned = !bookmark.isPinned
}

const getFavicon = (url: string) => {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch (error) {
    return '/placeholder.svg?height=32&width=32'
  }
}

const onFaviconError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=32&width=32'
}

const importBookmarks = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.html'
  input.onchange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string
        parseAndAddBookmarks(content)
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

const parseAndAddBookmarks = (content: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const bookmarkNodes = doc.querySelectorAll('a')
  const folderNodes = doc.querySelectorAll('h3')
  
  let currentGroup: BookmarkGroup | null = null
  
  folderNodes.forEach((folderNode, index) => {
    const groupTitle = folderNode.textContent || `Imported Group ${index + 1}`
    currentGroup = {
      id: Math.max(...bookmarkGroups.value.map(g => g.id), 0) + index + 1,
      title: groupTitle,
      isEditing: false,
      isPinned: false,
      bookmarks: []
    }
    
    let nextNode = folderNode.nextElementSibling
    while (nextNode && nextNode.tagName !== 'H3') {
      if (nextNode.tagName === 'A') {
        const bookmark: Bookmark = {
          id: currentGroup.bookmarks.length + 1,
          name: nextNode.textContent || 'Untitled',
          description: nextNode.getAttribute('description') || '',
          url: nextNode.getAttribute('href') || '',
          isEditing: false,
          isPinned: false
        }
        currentGroup.bookmarks.push(bookmark)
      }
      nextNode = nextNode.nextElementSibling
    }
    
    if (currentGroup.bookmarks.length > 0) {
      bookmarkGroups.value.push(currentGroup)
    }
  })
  
  // If no folders were found, create a single group with all bookmarks
  if (bookmarkGroups.value.length === 0) {
    const newGroup: BookmarkGroup = {
      id: Math.max(...bookmarkGroups.value.map(g => g.id), 0) + 1,
      title: 'Imported Bookmarks',
      isEditing: false,
      isPinned: false,
      bookmarks: []
    }
    
    bookmarkNodes.forEach((node, index) => {
      const bookmark: Bookmark = {
        id: index + 1,
        name: node.textContent || 'Untitled',
        description: node.getAttribute('description') || '',
        url: node.getAttribute('href') || '',
        isEditing: false,
        isPinned: false
      }
      newGroup.bookmarks.push(bookmark)
    })
    
    if (newGroup.bookmarks.length > 0) {
      bookmarkGroups.value.push(newGroup)
    }
  }
}

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
}

const changeLanguage = (lang: string) => {
  language.value = lang
  showLanguageMenu.value = false
}

const submitFeedback = () => {
  // Here you would typically send the feedback to a server
  console.log('Feedback submitted:', feedbackText.value)
  feedbackText.value = ''
  showFeedbackModal.value = false
  // Show a thank you message or notification
}

const t = (key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    zh: {
      bookmarkNavigator: '书签导航',
      editMode: '编辑模式',
      darkMode: '深色模式',
      searchBookmarks: '搜索书签...',
      addBookmark: '添加书签',
      addNewGroup: '添加新组',
      newBookmark: '新书签',
      editDescription: '请编辑描述',
      newGroup: '新分组',
      pin: '置顶',
      unpin: '取消置顶',
      importBookmarks: '导入书签',
      feedback: '反馈',
      versionHistory: '版本历史',
      enterFeedback: '请输入您的反馈...',
      submit: '提交',
      cancel: '取消',
      close: '关闭',
      edit: '编辑',
      delete: '删除',
      language: '语言',
      enterURL: '输入URL'
    },
    en: {
      bookmarkNavigator: 'Bookmark Navigator',
      editMode: 'Edit Mode',
      darkMode: 'Dark Mode',
      searchBookmarks: 'Search bookmarks...',
      addBookmark: 'Add Bookmark',
      addNewGroup: 'Add New Group',
      newBookmark: 'New Bookmark',
      editDescription: 'Edit description',
      newGroup: 'New Group',
      pin: 'Pin',
      unpin: 'Unpin',
      importBookmarks: 'Import Bookmarks',
      feedback: 'Feedback',
      versionHistory: 'Version History',
      enterFeedback: 'Enter your feedback...',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      edit: 'Edit',
      delete: 'Delete',
      language: 'Language',
      enterURL: 'Enter URL'
    }
  }
  return translations[language.value][key] || key
}

const sortedGroups = computed(() => {
  return [...bookmarkGroups.value].sort((a, b) => {
    if (a.isPinned === b.isPinned)   return 0
    return a.isPinned ? -1 : 1
  })
})

const sortedBookmarks = (group: BookmarkGroup) => {
  return [...group.bookmarks].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0
    return a.isPinned ? -1 : 1
  })
}

const filteredGroups = computed(() => {
  if (!searchTerm.value) return sortedGroups.value

  return sortedGroups.value.map(group => ({
    ...group,
    bookmarks: group.bookmarks.filter(bookmark =>
      bookmark.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })).filter(group => group.bookmarks.length > 0)
})

const isBookmarkMatched = (bookmark: Bookmark) => {
  if (!searchTerm.value) return false
  return bookmark.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
         bookmark.description.toLowerCase().includes(searchTerm.value.toLowerCase())
}

onMounted(() => {
  window.addEventListener('resize', updateHoverPosition)
  // Check system preference for dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
  }
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHoverPosition)
})
</script>

<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen bg-gray-100 dark:bg-[#1a1b27] transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white dark:bg-[#1a1b27] shadow">
      <div class="container mx-auto px-4 py-2 flex items-center justify-between">
        <div class="flex items-center">
          <svg class="w-8 h-8 mr-2 text-gray-800 dark:text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M512 22C241.38 22 22 241.38 22 512s219.38 490 490 490 490-219.38 490-490S782.62 22 512 22z m226.06 277.73L517.54 809.14c-3.18 7.28-13.72 7.08-17.21-0.41L410.4 616.57a5.966 5.966 0 0 0-2.97-2.97L215.6 523.58c-7.58-3.49-7.79-14.05-0.41-17.23l508.74-220.76c8.91-3.91 18.03 5.22 14.13 14.14z" fill="currentColor" />
          </svg>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <button @click="toggleEditMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('editMode')">
            <SettingsIcon v-if="!isEditMode" class="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <CheckIcon v-else class="h-5 w-5 text-green-600 dark:text-green-400" />
          </button>
          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('darkMode')">
            <SunIcon v-if="isDarkMode" class="h-5 w-5 text-yellow-400" />
            <MoonIcon v-else class="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div class="relative">
            <button @click="toggleLanguageMenu" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              {{ language.toUpperCase() }}
            </button>
            <div v-if="showLanguageMenu" class="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10">
              <button @click="changeLanguage('zh')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                中文
              </button>
              <button @click="changeLanguage('en')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                English
              </button>
            </div>
          </div>
          <button @click="importBookmarks" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('importBookmarks')">
            <UploadIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button @click="showFeedbackModal = true" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('feedback')">
            <MessageSquareIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button @click="showVersionHistory = true" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('versionHistory')">
            <ClockIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div class="relative">
            <div @click="toggleUserMenu" class="h-8 w-8 rounded-full cursor-pointer bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              <img v-if="user.avatar" :src="user.avatar" alt="User Avatar" class="h-full w-full rounded-full">
              <span v-else>{{ user.name.substring(0, 2).toUpperCase() }}</span>
            </div>
            <!-- User menu -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10">
              <div class="p-4">
                <h3 class="font-semibold dark:text-white">{{ user.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <!-- Search bar -->
      <div class="mb-8">
        <div class="relative max-w-md mx-auto">
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="t('searchBookmarks')"
            class="w-full px-10 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          >
          <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            v-if="searchTerm"
            @click="clearSearch"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <XIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Bookmark navigation area -->
      <div class="space-y-8">
        <div v-for="group in filteredGroups" :key="group.id" class="bg-white dark:bg-[#232532] p-6 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <input
              v-if="isEditMode && group.isEditing"
              v-model="group.title"
              @blur="finishEditingGroup(group)"
              @keyup.enter="finishEditingGroup(group)"
              class="text-xl font-bold w-full dark:bg-gray-700 dark:text-white"
            >
            <h2 v-else class="text-xl font-bold dark:text-white truncate max-w-[calc(100%-100px)]">{{ group.title }}</h2>
            <div class="flex items-center space-x-2">
              <button @click="toggleGroupPin(group)" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="group.isPinned ? t('unpin') : t('pin')">
                <StarIcon :class="{ 'text-yellow-500': group.isPinned, 'text-gray-400': !group.isPinned }" class="h-5 w-5" />
              </button>
              <template v-if="isEditMode">
                <button @click="startEditingGroup(group)" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('edit')">
                  <EditIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button @click="deleteGroup(group.id)" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" :title="t('delete')">
                  <Trash2Icon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </template>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            <div v-for="bookmark in sortedBookmarks(group)" :key="bookmark.id"
                 class="bg-white dark:bg-[#232532] bg-opacity-50 dark:bg-opacity-50 p-4 rounded-lg shadow-sm border dark:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-md relative"
                 :class="{ 'ring-2 ring-blue-500': isBookmarkMatched(bookmark) }"
                 @click="openBookmark(bookmark.url)"
                 @mouseenter="startHoverTimer(bookmark, $event)"
                 @mouseleave="clearHoverTimer"
                 @mousemove="updateHoverPosition">
              <div class="flex items-center">
                <svg v-if="!bookmark.url" class="h-8 w-8 mr-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <img v-else :src="getFavicon(bookmark.url)" @error="onFaviconError" :alt="bookmark.name" class="h-8 w-8 mr-3 my-auto">
                <div class="flex-grow">
                  <input
                    v-if="isEditMode && bookmark.isEditing"
                    v-model="bookmark.name"
                    @blur="finishEditingBookmark(bookmark)"
                    @keyup.enter="focusBookmarkDescription(bookmark)"
                    class="font-semibold w-full dark:bg-gray-600 dark:text-white text-sm"
                  >
                  <h3 v-else class="font-semibold dark:text-white text-sm truncate">{{ bookmark.name }}</h3>
                  <input
                    v-if="isEditMode && bookmark.isEditing"
                    v-model="bookmark.description"
                    @blur="finishEditingBookmark(bookmark)"
                    @keyup.enter="focusBookmarkUrl(bookmark)"
                    class="text-xs text-gray-500 w-full dark:bg-gray-600 dark:text-gray-300"
                  >
                  <p v-else class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ bookmark.description }}</p>
                  <input
                    v-if="isEditMode && bookmark.isEditing"
                    v-model="bookmark.url"
                    @blur="finishEditingBookmark(bookmark)"
                    @keyup.enter="finishEditingBookmark(bookmark)"
                    class="text-xs text-blue-500 w-full mt-1 dark:bg-gray-600 dark:text-blue-300"
                    :placeholder="t('enterURL')"
                  >
                </div>
              </div>
              <div class="absolute top-2 right-2 flex space-x-1">
                <button @click.stop="toggleBookmarkPin(group, bookmark)" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" :title="bookmark.isPinned ? t('unpin') : t('pin')">
                  <StarIcon :class="{ 'text-yellow-500': bookmark.isPinned, 'text-gray-400': !bookmark.isPinned }" class="h-4 w-4" />
                </button>
                <template v-if="isEditMode">
                  <button @click.stop="editBookmark(bookmark)" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" :title="t('edit')">
                    <EditIcon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button @click.stop="deleteBookmark(group.id, bookmark.id)" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" :title="t('delete')">
                    <Trash2Icon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </template>
              </div>
            </div>
          </div>
          <div v-if="isEditMode" class="mt-4">
            <button @click="addBookmark(group.id)" class="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 text-sm">
              {{ t('addBookmark') }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="isEditMode" class="mt-8">
        <button @click="addGroup" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 dark:bg-green-600 dark:hover:bg-green-700 text-sm">
          {{ t('addNewGroup') }}
        </button>
      </div>
    </div>

    <!-- URL hover tooltip -->
    <Teleport to="body">
      <div v-if="hoveredBookmark" 
           class="fixed p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 transition-all duration-200 ease-out"
           :style="{ top: `${hoverPosition.y}px`, left: `${hoverPosition.x}px` }">
        {{ hoveredBookmark.url }}
      </div>
    </Teleport>

    <!-- Feedback Modal -->
    <Teleport to="body">
      <div v-if="showFeedbackModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 class="text-xl font-bold mb-4 dark:text-white">{{ t('feedback') }}</h2>
          <textarea v-model="feedbackText" class="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:text-white text-sm" :placeholder="t('enterFeedback')"></textarea>
          <div class="flex justify-end mt-4">
            <button @click="submitFeedback" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">{{ t('submit') }}</button>
            <button @click="showFeedbackModal = false" class="px-4 py-2 ml-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm">{{ t('cancel') }}</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Version History Modal -->
    <Teleport to="body">
      <div v-if="showVersionHistory" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 class="text-xl font-bold mb-4 dark:text-white">{{ t('versionHistory') }}</h2>
          <ul class="list-disc pl-5 dark:text-white text-sm">
            <li>v1.1.0 - Added responsive design and dark mode improvements</li>
            <li>v1.0.1 - Bug fixes and performance improvements</li>
            <li>v1.0.0 - Initial release</li>
          </ul>
          <div class="flex justify-end mt-4">
            <button @click="showVersionHistory = false" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm">{{ t('close') }}</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Add any additional custom styles here */
body {
  font-size: 14px;
}

.dark .lucide {
  stroke-width: 1.5;
}
</style>
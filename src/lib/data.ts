import { Box, Layers, Palette, Wrench, BookOpen, LucideIcon } from 'lucide-react'

export type MenuItem = {
  id: string;
  name: string;
  icon: LucideIcon;
}

export type Bookmark = {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
}

export type BookmarkGroup = {
  id: number;
  title: string;
  bookmarks: Bookmark[];
}

export type CategoryData = {
  id: string;
  title: string;
  bookmarkGroups: BookmarkGroup[];
}

export const menuItems: MenuItem[] = [
  { id: 'products', name: '产品', icon: Box },
  { id: 'projects', name: '项目', icon: Layers },
  { id: 'design', name: '设计', icon: Palette },
  { id: 'tools', name: '工具', icon: Wrench },
  { id: 'learning', name: '学习', icon: BookOpen },
]

export const categoryData: Record<string, CategoryData> = {
  products: {
    id: 'products',
    title: '产品',
    bookmarkGroups: [
      {
        id: 1,
        title: '开发工具',
        bookmarks: [
          {
            id: 1,
            name: 'GitHub',
            description: '面向开源及私有软件项目的托管平台',
            url: 'https://github.com',
            icon: 'https://github.com/favicon.ico'
          },
          {
            id: 2,
            name: 'Stack Overflow',
            description: '程序设计领域的问答网站',
            url: 'https://stackoverflow.com',
            icon: 'https://stackoverflow.com/favicon.ico'
          },
        ]
      },
      {
        id: 2,
        title: '设计工具',
        bookmarks: [
          {
            id: 3,
            name: 'Figma',
            description: '基于浏览器的协作式界面设计工具',
            url: 'https://www.figma.com',
            icon: 'https://www.figma.com/favicon.ico'
          },
          {
            id: 4,
            name: 'Canva',
            description: '简单易用的平面设计工具',
            url: 'https://www.canva.com',
            icon: 'https://www.canva.com/favicon.ico'
          },
        ]
      },
    ]
  },
  projects: {
    id: 'projects',
    title: '项目',
    bookmarkGroups: [
      {
        id: 1,
        title: '项目管理',
        bookmarks: [
          {
            id: 1,
            name: 'Trello',
            description: '灵活的项目管理工具',
            url: 'https://trello.com',
            icon: 'https://trello.com/favicon.ico'
          },
          {
            id: 2,
            name: 'Asana',
            description: '团队协作和工作管理平台',
            url: 'https://asana.com',
            icon: 'https://asana.com/favicon.ico'
          },
        ]
      },
    ]
  },
  design: {
    id: 'design',
    title: '设计',
    bookmarkGroups: [
      {
        id: 1,
        title: 'UI/UX 设计',
        bookmarks: [
          {
            id: 1,
            name: 'Dribbble',
            description: '设计师分享作品的平台',
            url: 'https://dribbble.com',
            icon: 'https://dribbble.com/favicon.ico'
          },
          {
            id: 2,
            name: 'Behance',
            description: '创意专业人士的在线平台',
            url: 'https://www.behance.net',
            icon: 'https://www.behance.net/favicon.ico'
          },
        ]
      },
    ]
  },
  tools: {
    id: 'tools',
    title: '工具',
    bookmarkGroups: [
      {
        id: 1,
        title: '生产力工具',
        bookmarks: [
          {
            id: 1,
            name: 'Notion',
            description: '一体化的工作空间',
            url: 'https://www.notion.so',
            icon: 'https://www.notion.so/favicon.ico'
          },
          {
            id: 2,
            name: 'Evernote',
            description: '笔记和任务管理应用',
            url: 'https://evernote.com',
            icon: 'https://evernote.com/favicon.ico'
          },
        ]
      },
    ]
  },
  learning: {
    id: 'learning',
    title: '学习',
    bookmarkGroups: [
      {
        id: 1,
        title: '在线课程平台',
        bookmarks: [
          {
            id: 1,
            name: 'Coursera',
            description: '提供各种在线课程的学习平台',
            url: 'https://www.coursera.org',
            icon: 'https://www.coursera.org/favicon.ico'
          },
          {
            id: 2,
            name: 'edX',
            description: '高质量的在线课程平台',
            url: 'https://www.edx.org',
            icon: 'https://www.edx.org/favicon.ico'
          },
        ]
      },
    ]
  },
}
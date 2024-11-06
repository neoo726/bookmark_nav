import Link from 'next/link'
import { Home, Bookmark, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-100 dark:bg-gray-800 p-4 hidden md:block">
      <ul className="space-y-2">
        <li>
          <Link href="/" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/bookmarks" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
            <Bookmark className="h-5 w-5" />
            <span>Bookmarks</span>
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
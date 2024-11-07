'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Layers, Palette, Wrench, BookOpen } from 'lucide-react'

const menuItems = [
  { name: '产品', icon: Box, href: '/products' },
  { name: '项目', icon: Layers, href: '/projects' },
  { name: '设计', icon: Palette, href: '/design' },
  { name: '工具', icon: Wrench, href: '/tools' },
  { name: '学习', icon: BookOpen, href: '/learning' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <nav className="w-64 bg-white shadow-md">
      <ul className="py-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const isHovered = hoveredItem === item.name

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-4 text-lg font-semibold transition-colors duration-150 ease-in-out ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon
                  className={`h-6 w-6 mr-4 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  } ${isHovered && !isActive ? 'text-gray-600' : ''}`}
                />
                <span className="font-display">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
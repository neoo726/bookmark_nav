'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { menuItems } from '@/lib/data'

export default function Sidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <nav className="w-64 bg-white shadow-md flex flex-col h-full">
      <ul className="flex-1 py-2 overflow-auto">
        {menuItems.map((item) => {
          const isActive = pathname === `/${item.id}`
          const isHovered = hoveredItem === item.id

          return (
            <li key={item.id}>
              <Link
                href={`/${item.id}`}
                className={`flex items-center px-6 py-4 text-lg font-semibold transition-colors duration-150 ease-in-out ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon
                  className={`h-6 w-6 mr-4 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  } ${isHovered && !isActive ? 'text-gray-600' : ''}`}
                />
                <span>{item.name}</span>
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
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Globe } from 'lucide-react'

type BookmarkCardProps = {
  name: string
  description: string
  url: string
  icon: string
}

export default function BookmarkCard({ name, description, url, icon }: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-4 flex items-start space-x-4">
          <div className="flex-shrink-0 w-8 h-8 relative">
            {!imageError ? (
              <Image
                src={icon}
                alt={`${name} icon`}
                width={32}
                height={32}
                className="rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{name}</p>
            <p className="text-sm text-gray-500 truncate">{description}</p>
          </div>
        </div>
      </div>
    </a>
  )
}
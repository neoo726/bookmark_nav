'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AuthModal } from '@/components/AuthModal'
import { useState } from 'react'

export default function Header() {
  const { language, setLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <header className="bg-white shadow-md w-full">
      <div className="mx-auto h-16 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-xl font-bold ml-2">Bookmark Navigator</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="font-medium">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('English')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('中文')}>
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Image
                    src={user.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout}>
                  {language === '中文' ? '登出' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)}>
              {language === '中文' ? '登录' : 'Login'}
            </Button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  )
}